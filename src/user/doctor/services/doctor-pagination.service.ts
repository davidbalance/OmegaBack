import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from "../repositories/doctor.repository";
import { Brackets, SelectQueryBuilder } from 'typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { Doctor } from '../dtos/response/doctor.base.dto';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';

@Injectable()
export class DoctorPaginationService extends BasePaginationService<DoctorEntity, Doctor> {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras?: any | undefined): SelectQueryBuilder<DoctorEntity> {
    return this.repository.query('doctor')
      .leftJoinAndSelect('doctor.user', 'user')
      .select('doctor.id', 'id')
      .addSelect('doctor.hasFile', 'hasFile')
      .addSelect('user.id', 'user')
      .addSelect('user.dni', 'dni')
      .addSelect('user.email', 'email')
      .addSelect('user.name', 'name')
      .addSelect('user.lastname', 'lastname')
      .addSelect('user.hasCredential', 'hasCredential')
      .where(new Brackets(qr => qr.where('user.dni LIKE :filter', { filter: `%${filter}%` })
        .orWhere('user.email LIKE :filter', { filter: `%${filter}%` })
        .orWhere('user.name LIKE :filter', { filter: `%${filter}%` })
        .orWhere('user.lastname LIKE :filter', { filter: `%${filter}%` })))
  }
}
