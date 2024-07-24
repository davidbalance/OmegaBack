import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../patient.repository';
import { IPagination } from '@/shared/utils/bases/base.pagination';
import { Brackets } from 'typeorm';
import { PatientEeqResponseDto } from '../dtos/response/base.patient-eeq.response.dto';
import { INJECT_PATIENT_EEQ_FLAT_SERVICE } from './patient-eeq-flat.service';
import { FlatService } from '@/shared/utils/bases/base.flat-service';
import { PaginationOrder } from '@/shared/utils/bases/base.pagination.dto';

@Injectable()
export class PatientEeqPaginationService implements IPagination<PatientEeqResponseDto> {

  private readonly companyName: string = 'employee_of';
  private readonly companyValue: string = '1790053881001'
  private readonly roleKey: string = 'role';

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
    @Inject(INJECT_PATIENT_EEQ_FLAT_SERVICE) private readonly flatService: FlatService<Patient, PatientEeqResponseDto | null>
  ) { }

  async findPaginatedDataAndPageCount(
    page: number = 0,
    limit: number = 300,
    filter?: string,
    order?: PaginationOrder
  ): Promise<[value: number, data: PatientEeqResponseDto[]]> {
    const data = await this.findPaginatedByFilter(page, limit, filter, order);
    const pages = await this.findPageCount(limit, filter);
    return [pages, data];
  }

  async findPaginatedByFilter(
    page: number = 0,
    limit: number = 300,
    filter?: string,
    order?: PaginationOrder
  ): Promise<PatientEeqResponseDto[]> {

    const query = this.queryBuilder(filter);

    if (order) {
      query.orderBy(`user.${order.key}`, order.order);
    }

    const patients = await query.take(limit).skip(page).getMany();
    const flatPatients = patients.map(this.flatService.flat).filter(e => !!e);
    return flatPatients;
  }

  async findPageCount(
    limit: number = 300,
    filter?: string
  ): Promise<number> {
    const count = await this.queryBuilder(filter).getCount();
    return Math.floor(count / limit);
  }

  private queryBuilder(filter: string) {
    return this.repository.query('patient')
      .leftJoinAndSelect('patient.user', 'user', 'user.status = :status ', { status: true })
      .leftJoinAndSelect('user.extraAttributes', 'extraAttribute')
      .innerJoin('user.extraAttributes', 'extraAttribute2', 'extraAttribute2.name = :name2 AND extraAttribute2.value = :value2', { name2: this.companyName, value2: this.companyValue })
      .where(new Brackets(qr => {
        qr.where('user.name LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.lastname LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.email LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.dni LIKE :filter', { filter: `%${filter}%` })
          .orWhere('extraAttribute.value LIKE :filter', { filter: `%${filter}%` })
      }))
      .andWhere('extraAttribute.name = :name1', { name1: this.roleKey });
  }
}
