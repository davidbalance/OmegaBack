import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../patient.repository';
import { IPagination, PaginationOrder } from '@/shared/utils/bases/base.pagination';
import { Brackets } from 'typeorm';
import { PatientEeqResponseDto } from '../dtos/response/base.patient-eeq.response.dto';

@Injectable()
export class PatientEeqPaginationService implements IPagination<PatientEeqResponseDto> {

  private readonly companyName: string = 'employee_of';
  private readonly companyValue: string = '1790053881001'
  private readonly roleKey: string = 'role';

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
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
    const flatten = await Promise.all(patients.map(this.flatPatient));
    return flatten.filter(e => !!e);
  }

  async findPageCount(
    limit: number = 300,
    filter?: string
  ): Promise<number> {
    const count = await this.queryBuilder(filter).getCount();
    return Math.floor(count / limit);
  }

  private async flatPatient(patient: Patient): Promise<PatientEeqResponseDto | null> {
    return new Promise((resolve, reject) => {
      const role = patient.user.extraAttributes.find(e => e.name === 'role');
      if (!role) resolve(null);
      const flattenedPatient: PatientEeqResponseDto = { ...patient.user, ...patient, user: patient.user.id, role: role.value };
      resolve(flattenedPatient);
    });
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
