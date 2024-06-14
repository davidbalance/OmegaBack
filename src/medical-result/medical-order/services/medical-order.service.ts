import { Inject, Injectable, Logger } from '@nestjs/common';
import path from 'path';
import { MailerService } from '@/shared/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { FindOrderFilesResponseDTO } from '../../common/dtos';
import { MedicalOrderRepository } from '../medical-order.repository';
import { MedicalOrder } from '../entities/medical-order.entity';

@Injectable()
export class MedicalOrderService {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
    @Inject(MailerService) private readonly mailer: MailerService,
    @Inject(ConfigService) private readonly config: ConfigService
  ) { }

  /**
   * Finds an order by its id
   * @param dni 
   * @returns FindOrderFilesResponseDTO
   */
  async findOrderFilesById(id: number): Promise<FindOrderFilesResponseDTO> {
    const order = await this.repository.findOne({
      where: {
        id: id
      },
      relations: ['results'],
      cache: 1000 * 900
    });

    return {
      dni: order.patientDni,
      email: order.patientEmail,
      fullname: order.patientFullname,
      fileReports: order.results.filter(e => !!e.report).map((e) => ({ ...e.report, type: 'report' })),
      fileResults: order.results.map(e => ({ ...e, type: 'result' }))
    };
  }

  /**
   * Finds all orders owned by a patient
   * @param dni 
   * @returns Array of Order
   */
  async findByPatient(dni: string): Promise<MedicalOrder[]> {
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
    const url: string = `${this.config.get<string>('APP_TARGET_HOST')}/order/${order.id}`

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
