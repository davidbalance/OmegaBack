import { Inject, Injectable } from '@nestjs/common';
import { PatientRepository } from '../repositories/patient.repository';
import { Brackets } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { PatientResponseDto } from '../dtos/response/base.patient.response.dto';

@Injectable()
export class PatientPaginationService extends BasePaginationService<Patient, PatientResponseDto> {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
  ) {
    super();
  }

  protected queryBuilder(filter: string) {
    return this.repository
      .query('patient')
      .leftJoinAndSelect('patient.user', 'user', 'user.status = :status', { status: true })
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
