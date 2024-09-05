import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../repositories/patient.repository';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { Brackets, SelectQueryBuilder } from 'typeorm';
import { PatientEeqResponseDto } from '../dtos/response/base.patient-eeq.response.dto';

@Injectable()
export class PatientEeqPaginationService extends BasePaginationService<Patient, PatientEeqResponseDto> {

  private readonly companyName: string = 'employee_of';
  private readonly companyValue: string = '1790053881001'
  private readonly roleKey: string = 'role';

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
  ) { super(); }

  protected queryBuilder(filter: string): SelectQueryBuilder<Patient> {
    return this.repository.query('patient')
      .leftJoinAndSelect('patient.user', 'user', 'user.status = :status ', { status: true })
      .leftJoinAndSelect('user.extraAttributes', 'extraAttribute')
      .innerJoin('user.extraAttributes', 'extraAttribute2', 'extraAttribute2.name = :name2 AND extraAttribute2.value = :value2', { name2: this.companyName, value2: this.companyValue })
      .select('user.name', 'name')
      .addSelect('user.lastname', 'lastname')
      .addSelect('user.email', 'email')
      .addSelect('user.dni', 'dni')
      .addSelect('user.id', 'user')
      .addSelect('patient.birthday', 'birthday')
      .addSelect('patient.gender', 'gender')
      .addSelect('extraAttribute.value', 'role')
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
