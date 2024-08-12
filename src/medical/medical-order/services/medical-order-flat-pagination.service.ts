import { Inject, Injectable } from '@nestjs/common';
import { IPagination } from '@/shared/utils/bases/base.pagination';
import { MedicalOrderRepository } from '../repositories/medical-order.repository';
import { Brackets } from 'typeorm';
import { MedicalOrderFlatResponseDto } from '../dtos/response/base.medical-order-flat.response.dto';
import { PaginationOrder } from '@/shared/utils/bases/base.pagination.dto';
import { MedicalOrderFlatService } from './medical-order-flat.service';

@Injectable()
export class MedicalOrderFlatPaginationService implements IPagination<MedicalOrderFlatResponseDto> {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
    @Inject(MedicalOrderFlatService) private readonly flatService: MedicalOrderFlatService
  ) { }

  async findPaginatedDataAndPageCount(page: number, limit: number, filter?: string, order?: PaginationOrder): Promise<[value: number, data: MedicalOrderFlatResponseDto[]]> {
    const pages = await this.findPageCount(limit, filter);
    const data = await this.findPaginatedByFilter(page, limit, filter, order);
    return [pages, data];
  }

  async findPaginatedByFilter(page: number, limit: number, filter: string = '', order?: PaginationOrder): Promise<MedicalOrderFlatResponseDto[]> {
    const query = this.queryBuilder(filter);
    const orders = await query
      .orderBy('order.createAt')
      .take(limit)
      .skip(page)
      .getMany();

    const flatten = orders.map(this.flatService.flat);
    return flatten;
  }

  async findPageCount(limit: number, filter?: string): Promise<number> {
    const count = await this.queryBuilder(filter).getCount();
    return Math.floor(count / limit);
  }

  private queryBuilder(filter?: string) {
    return this.repository.query('order')
      .leftJoinAndSelect('order.client', 'client')
      .leftJoinAndSelect('client.email', 'email')
      .leftJoinAndSelect('order.results', 'result')
      .leftJoinAndSelect('result.diseases', 'diseases')
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
