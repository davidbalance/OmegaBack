import { Inject, Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import { MailService } from '@/shared/mail/mail.service';
import path from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class OrderService {

  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository,
    @Inject(MailService) private readonly mailer: MailService
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

  async sendMail(id: number): Promise<void> {
    const order = await this.repository.findOne({
      where: { id: id },
      select: {
        id: true,
        patientEmail: true,
        patientFullname: true
      }
    })
    try {
      const directory = path.resolve('static/images/omega.png');

      this.mailer.send(
        {
          email: 'panchitodmun@gmail.com',
          subject: 'Resultados exámenes ocupacionales'
        },
        {
          patientFullname: order.patientFullname,
        },
        [{
          filename: 'omega.png',
          path: directory,
          cid: 'logo'
        }]);
    } catch (error) {
      Logger.error(JSON.stringify(error));
    }
  }
}
