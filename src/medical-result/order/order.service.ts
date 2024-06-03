import { Inject, Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import path from 'path';
import { MailerService } from '@/shared/mailer/mailer.service';

@Injectable()
export class OrderService {

  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository,
    @Inject(MailerService) private readonly mailer: MailerService
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
    const directory = path.resolve('static/images/omega.png');
    const order = await this.repository.findOne({
      where: { id: id },
      select: {
        id: true,
        patientEmail: true,
        patientFullname: true
      }
    });
    await this.mailer.send({
      recipients: [
        {
          name: order.patientFullname,
          address: 'panchitodmun@gmail.com'
        }
      ],
      subject: 'Resultados exámenes ocupacionales',
      placeholderReplacements: {
        patientFullname: order.patientFullname,
      },
      attachments: [
        {
          filename: 'omega.png',
          path: directory,
          cid: 'logo'
        }
      ]
    });
  }
}
