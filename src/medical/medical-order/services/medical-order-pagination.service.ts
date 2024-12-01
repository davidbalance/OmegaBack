import { Inject, Injectable } from '@nestjs/common';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { MedicalOrderRepository } from '../repositories/medical-order.repository';
import { SelectQueryBuilder } from 'typeorm';
import { MedicalOrderEntity } from '../entities/medical-order.entity';
import { MedicalOrder } from '../dtos/response/medical-order.base.dto';

@Injectable()
export class MedicalOrderPaginationService extends BasePaginationService<MedicalOrderEntity, MedicalOrder> {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
  ) {
    super();
  }

  protected queryBuilder(filter: string, extras: string): SelectQueryBuilder<MedicalOrderEntity> {
    return this.repository.query('order')
      .innerJoin('order.client', 'client', 'client.dni = :dni', { dni: extras })
      .select('order.id', 'id')
      .addSelect('order.process', 'process')
      .addSelect('order.createAt', 'createAt')
      .addSelect('order.mailStatus', 'mailStatus')
      .addSelect('order.orderStatus', 'orderStatus')
      .where('order.process LIKE :filter', { filter: `%${filter}%` })
      .orderBy('createAt', 'DESC')
  }
}
