import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../patient.repository';
import { IPagination, PaginationOrder } from '@/shared/utils/bases/base.pagination';
import { Brackets } from 'typeorm';

@Injectable()
export class PatientPaginationService implements IPagination<Patient> {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository
  ) { }

  private queryBuilder(filter: string) {
    return this.repository
      .query('patient')
      .leftJoinAndSelect('patient.user', 'user', 'user.status = :status', { status: true })
      .where(new Brackets(qr => {
        qr.where('user.name LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.lastname LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.email LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.dni LIKE :filter', { filter: `%${filter}%` })
      }));
  }

  async findPaginatedDataAndPageCount(
    page: number = 0,
    limit: number = 300,
    filter: string = '',
    order?: PaginationOrder
  ): Promise<[value: number, data: Patient[]]> {
    const pages = await this.findPageCount(limit, filter);
    const data = await this.findPaginatedByFilter(page, limit, filter, order);
    return [pages, data];
  }

  async findPaginatedByFilter(
    page: number = 0,
    limit: number = 300,
    filter: string = '',
    order?: PaginationOrder
  ): Promise<Patient[]> {

    const query = this.queryBuilder(filter);

    if (order) {
      query.orderBy(`user.${order.key}`, order.order);
    }

    const patients = query
      .take(limit)
      .skip(page)
      .getMany();
    return patients;
  }

  async findPageCount(
    limit: number = 300,
    filter: string = ''
  ): Promise<number> {
    const query = this.queryBuilder(filter);
    const count = await query.getCount();
    return Math.floor(count / limit);
  }
}
