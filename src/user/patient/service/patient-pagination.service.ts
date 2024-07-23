import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../patient.repository';
import { IPagination, PaginationOrder } from '@/shared/utils/bases/base.pagination';
import { Brackets } from 'typeorm';
import { PatientResponseDto } from '../dtos/response/base.patient.response.dto';
import { FlatService } from '@/shared/utils/bases/base.flat-service';
import { INJECT_PATIENT_FLAT_SERVICE } from './patient-flat.service';

@Injectable()
export class PatientPaginationService implements IPagination<PatientResponseDto> {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
    @Inject(INJECT_PATIENT_FLAT_SERVICE) private readonly flatService: FlatService<Patient, PatientResponseDto>
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
  ): Promise<[value: number, data: PatientResponseDto[]]> {
    const pages = await this.findPageCount(limit, filter);
    const data = await this.findPaginatedByFilter(page, limit, filter, order);
    return [pages, data];
  }

  async findPaginatedByFilter(
    page: number = 0,
    limit: number = 300,
    filter: string = '',
    order?: PaginationOrder
  ): Promise<PatientResponseDto[]> {

    const query = this.queryBuilder(filter);

    if (order) {
      query.orderBy(`user.${order.key}`, order.order);
    }

    const patients = await query
      .take(limit)
      .skip(page)
      .getMany();
    console.log(patients);
    const flatPatients = patients.map(this.flatService.flat);
    return flatPatients;
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
