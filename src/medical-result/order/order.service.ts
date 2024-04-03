import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository,
  ) { }

  async findByPatient(dni: string): Promise<Order[]> {
    const orders = await this.repository.find({
      where: {
        patientDni: dni
      },
      select: {
        id: true,
        patientDni: true,
        patientFullname: true,
        process: true,
        createAt: true,
        results: {
          id: true,
          examName: true,
          disease: true,
        }
      },
      relations: {
        results: true
      }
    });
    return orders;
  }
}
