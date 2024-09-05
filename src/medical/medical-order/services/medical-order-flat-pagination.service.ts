import { Inject, Injectable } from '@nestjs/common';
import { BasePaginationService } from '@/shared/utils/bases/base.pagination.service';
import { MedicalOrderRepository } from '../repositories/medical-order.repository';
import { Brackets } from 'typeorm';
import { MedicalOrderFlatResponseDto } from '../dtos/response/base.medical-order-flat.response.dto';
import { MedicalOrder } from '../entities/medical-order.entity';

@Injectable()
export class MedicalOrderFlatPaginationService extends BasePaginationService<MedicalOrder, MedicalOrderFlatResponseDto> {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
  ) {
    super();
  }

  protected queryBuilder(filter?: string) {
    return this.repository.query('order')
      .leftJoinAndSelect('order.client', 'client')
      .select('order.id', 'id')
      .addSelect('client.name', 'name')
      .addSelect('client.lastname', 'lastname')
      .addSelect('client.dni', 'dni')
      .addSelect('order.mailStatus', 'mailStatus')
      .addSelect('order.orderStatus', 'orderStatus')
      .addSelect('order.companyRuc', 'companyRuc')
      .addSelect('order.companyName', 'companyName')
      .addSelect('order.process', 'process')
      .addSelect('order.createAt', 'createAt')
      .where(new Brackets(qr => {
        qr.where('order.companyRuc LIKE :filter', { filter: `%${filter}%` })
          .orWhere('order.companyName LIKE :filter', { filter: `%${filter}%` })
      }))
      .orWhere(new Brackets(qr => {
        qr.where('client.name LIKE :filter', { filter: `%${filter}%` })
          .orWhere('client.lastname LIKE :filter', { filter: `%${filter}%` })
          .orWhere('client.dni LIKE :filter', { filter: `%${filter}%` })
      }))
  }
}
