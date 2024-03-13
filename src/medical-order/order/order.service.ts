import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { Result } from '../result/entities/result.entity';
import { Send } from '../send/entities/send.entity';

@Injectable()
export class OrderService {

  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.repository.create(createOrderDto);
  }

  async readOneByID(id: number): Promise<Order> {
    return await this.repository.findOne({ id: id });
  }

  async readAll(): Promise<Order[]> {
    return await this.repository.find({});
  }

  async appendResult(id: number, results: Result[]): Promise<Order> {
    return this.repository.findOneAndAppendResult({ id }, results);
  }

  async removeResult(id: number, results: number[]): Promise<Order> {
    return this.repository.findOneAndRemoveResult({ id }, results);
  }

  async send(id: number, sends: Send[]): Promise<Order> {
    const order = await this.repository.findOne({ id }, { sends: true });
    const filterSends = order.sends.filter(e => !sends.includes(e));
    // Here goes send logic for each send item
    return this.repository.findOneAndSend({ id }, filterSends);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return await this.repository.findOneAndUpdate({ id }, updateOrderDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}
