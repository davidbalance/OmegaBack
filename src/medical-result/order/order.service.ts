import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { FindOrder } from '../common/dtos/order.response.dto';

@Injectable()
export class OrderService {

  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository,
  ) { }

  async findByPatient(patient: string): Promise<FindOrder[]> {
    const orders = await this.repository.find({
      where: { patient: patient },
      select: {
        id: true,
        patient: true,
        process: true,
        createAt: true,
        results: {
          id: true,
          examName: true,
          address: true
        }
      }
    });
    return orders;
  }
}
