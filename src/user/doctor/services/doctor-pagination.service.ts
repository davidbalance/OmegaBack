import { Inject, Injectable } from '@nestjs/common';
import { DoctorRepository } from "../repositories/doctor.repository";
import { DoctorResponseDto } from '../dtos/response/base.doctor.response.dto';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { Doctor } from '../entities/doctor.entity';
import { Brackets, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class DoctorPaginationService extends BasePaginationService<Doctor, DoctorResponseDto> {

  constructor(
    @Inject(DoctorRepository) private readonly repository: DoctorRepository,
  ) { super(); }

  protected queryBuilder(filter: string): SelectQueryBuilder<Doctor> {
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
      .where(new Brackets(qr => {
        qr.where('user.dni LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.email LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.name LIKE :filter', { filter: `%${filter}%` })
          .orWhere('user.lastname LIKE :filter', { filter: `%${filter}%` })
      }))
  }
}
