import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { Result } from '../result/entities/result.entity';
import { CreateOrderRequestDTO } from 'src/shared';

interface FindOrderParams {
  patient?: string;
  corporativeGroup?: number;
  company?: string;
  branch?: number;
  labint?: number;
}

@Injectable()
export class OrderService {

  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository,
  ) { }

  async create(order: CreateOrderRequestDTO): Promise<Order> {
    return await this.repository.create({ ...order, labint: order.key });
  }

  async find(params?: FindOrderParams): Promise<Order[]> {
    return this.repository.find(params, { results: true });
  }

  async findOne(params?: FindOrderParams & { id: number }): Promise<Order> {
    return this.repository.findOne(params, { results: true });
  }

  async updateResults(id: number, results: Result[]): Promise<Order> {
    return this.repository.findOneAndAppendResult({ id }, results);
  }
}
