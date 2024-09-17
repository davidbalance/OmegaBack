import { Inject, Injectable } from '@nestjs/common';
import { PatientRepository } from '../repositories/patient.repository';
import { Patient } from '../dtos/response/patient.base.dto';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { PatientEntity } from '../entities/patient.entity';
import { Brackets, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class PatientLookForCompanyPaginationService extends BasePaginationService<PatientEntity, Patient> {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras: { name: string, value: string }): SelectQueryBuilder<PatientEntity> {
    return this.repository
      .query('patient')
      .innerJoinAndSelect('patient.user', 'user', 'user.status = :status', { status: true })
      .innerJoin('user.extraAttributes', 'attribute', 'attribute.name = :name and attribute.value = :value', { ...extras })
      .select('user.name', 'name')
      .addSelect('user.lastname', 'lastname')
      .addSelect('user.email', 'email')
      .addSelect('user.dni', 'dni')
      .addSelect('user.id', 'user')
      .addSelect('patient.birthday', 'birthday')
      .addSelect('patient.gender', 'gender')
      .where(new Brackets(qr => {
        qr.where('user.name LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.lastname LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.email LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.dni LIKE :filter', { filter: `%${filter}%` })
      }));
  }
}
