import { Inject, Injectable } from '@nestjs/common';
import { MedicalClientRepository } from '../repositories/medical-client.repository';
import { MedicalClient } from '../dtos/response/medical-client.base.dto';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { MedicalClientEntity } from '../entities/medical-client.entity';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class MedicalClientDoctorPaginationService extends BasePaginationService<MedicalClientEntity, MedicalClient> {

  constructor(
    @Inject(MedicalClientRepository) private readonly clientRepository: MedicalClientRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras?: string): SelectQueryBuilder<MedicalClientEntity> {
    return this.clientRepository.query('client')
      .leftJoin('client.medicalOrders', 'order')
      .innerJoin('order.results', 'result', 'medicalResult.doctorDni = :dni', { dni: extras })
      .select('client.dni', 'dni')
      .addSelect('client.name', 'name')
      .addSelect('client.lastname', 'lastname')
      .addSelect('client.createAt', 'createAt')
      .where('client.dni = :filter', { filter: `%${filter}%` })
      .orWhere('client.name = :filter', { filter: `%${filter}%` })
      .orWhere('client.lastname = :filter', { filter: `%${filter}%` })
  }
}
