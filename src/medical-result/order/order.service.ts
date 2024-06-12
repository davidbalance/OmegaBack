import { Inject, Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entities/order.entity';
import path from 'path';
import { MailerService } from '@/shared/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {

  constructor(
    @Inject(OrderRepository) private readonly repository: OrderRepository,
    @Inject(MailerService) private readonly mailer: MailerService,
    @Inject(ConfigService) private readonly config: ConfigService
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
        mailStatus: true,
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
    const url: string = `${this.config.get<string>('APP_TARGET_HOST')}/patient/order/${order.id}`

    try {
      await this.mailer.send({
        recipients: [
          {
            name: order.patientFullname,
            address: order.patientEmail
          }
        ],
        subject: 'Resultados exámenes ocupacionales',
        placeholderReplacements: {
          patientFullname: order.patientFullname,
          url: url
        },
        attachments: [
          {
            filename: 'omega.png',
            path: directory,
            cid: 'logo'
          }
        ]
      });
    } catch (error) {
      this.repository.findOneAndUpdate({ id: id }, { mailStatus: false });
      Logger.error(error);
      throw error;
    }
    this.repository.findOneAndUpdate({ id: id }, { mailStatus: true });
  }
}
