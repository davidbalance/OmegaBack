import { Inject, Injectable } from '@nestjs/common';
import { MedicalOrder } from '../entities/medical-order.entity';
import { IPagination, PaginationOrder } from '@/shared/utils/bases/base.pagination';
import { MedicalOrderRepository } from '../repositories/medical-order.repository';
import { Brackets } from 'typeorm';
import { MedicalOrderFlatResponseDto } from '../dtos/response/base.medical-order-flat.response.dto';

@Injectable()
export class MedicalOrderFlatPaginationService implements IPagination<MedicalOrderFlatResponseDto> {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository
  ) { }

  private flatMedicalOrder({ client, results, ...order }: MedicalOrder): Promise<MedicalOrderFlatResponseDto> {
    return new Promise((resolve, reject) => {
      const { dni, fullname, email } = client;
      const { branchName, corporativeName, externalKey, updateAt, ...values } = order;
      resolve(({ dni, fullname, ...values, email: email, results: results as any }));
    });
  }

  async findPaginatedDataAndPageCount(page: number, limit: number, filter?: string, order?: PaginationOrder): Promise<[value: number, data: MedicalOrderFlatResponseDto[]]> {
    const pages = await this.findPageCount(limit, filter);
    const data = await this.findPaginatedByFilter(page, limit, filter, order);
    return [pages, data];
  }

  async findPaginatedByFilter(page: number, limit: number, filter?: string, order?: PaginationOrder): Promise<MedicalOrderFlatResponseDto[]> {
    const orders = await this.repository.query('order')
      .leftJoinAndSelect('order.client', 'client')
      .leftJoinAndSelect('client.email', 'email')
      .leftJoinAndSelect('order.results', 'result')
      .leftJoinAndSelect('result.diseases', 'diseases')
      .where(new Brackets(qr => {
        qr.where('order.companyRuc LIKE :filter', { filter: `%${filter}%` })
          .orWhere('order.companyName LIKE :filter', { filter: `%${filter}%` })
      }))
      .orWhere(new Brackets(qr => {
        qr.where('client.fullname LIKE :filter', { filter: `%${filter}%` })
          .orWhere('client.dni LIKE :filter', { filter: `%${filter}%` })
      }))
      .orderBy('order.createAt')
      .take(limit)
      .skip(page)
      .getMany();

    const flatten = await Promise.all(orders.map(this.flatMedicalOrder));
    return flatten;
  }

  async findPageCount(limit: number, filter?: string): Promise<number> {
    const count = await this.repository.query('order')
      .leftJoinAndSelect('order.client', 'client')
      .leftJoinAndSelect('order.results', 'result')
      .where(new Brackets(qr => {
        qr.where('order.companyRuc LIKE :filter', { filter: `%${filter}%` })
          .orWhere('order.companyName LIKE :filter', { filter: `%${filter}%` })
      }))
      .orWhere(new Brackets(qr => {
        qr.where('client.fullname LIKE :filter', { filter: `%${filter}%` })
          .orWhere('client.dni LIKE :filter', { filter: `%${filter}%` })
      }))
      .getCount();
    return Math.floor(count / limit);
  }
}
