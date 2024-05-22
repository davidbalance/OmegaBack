import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository
  ) { }

  /**
   * Finds all orders owned by a patient
   * @param dni 
   * @returns Array of Order
   */
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
          diseaseId: true,
          diseaseName: true,
          diseaseGroupId: true,
          diseaseGroupName: true
        }
      },
      relations: {
        results: true
      },
      cache: 1000 * 900
    });
    return orders;
  }
}
