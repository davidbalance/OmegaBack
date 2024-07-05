import { Inject, Injectable, Logger } from '@nestjs/common';
import path from 'path';
import { MailerService } from '@/shared/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { MedicalOrderRepository } from '../medical-order.repository';
import { MedicalOrder } from '../entities/medical-order.entity';
import { MedicalEmail } from '@/medical/medical-client/entities/medical-email.entity';
import { GETMedicalOrderFilesResponseDto } from '../dtos/medical-order.response.dto';

@Injectable()
export class MedicalOrderService {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
    @Inject(MailerService) private readonly mailer: MailerService,
    @Inject(ConfigService) private readonly config: ConfigService
  ) { }

  async findOrderFilesById(id: number): Promise<GETMedicalOrderFilesResponseDto> {
    const order = await this.repository.findOne({
      where: {
        id: id
      },
      relations: ['results'],
      cache: 1000 * 900
    });

    const { client, results } = order;

    return {
      dni: client.dni,
      fullname: client.fullname,
      fileReports: results.filter(e => !!e.report).map((e) => ({ ...e.report, type: 'report' })),
      fileResults: results.map(e => ({ ...e, type: 'result' }))
    };
  }

  async findByPatient(dni: string): Promise<MedicalOrder[]> {
    const orders = await this.repository.find({
      where: {
        client: { dni }
      },
      select: {
        id: true,
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

  async findByPatientAndDoctor(patient: string, doctor: string): Promise<MedicalOrder[]> {
    const orders = await this.repository.createQuery('medicalOrder')
      .leftJoinAndSelect('medicalOrder.results', 'medicalResult', 'medicalResult.doctorDni = :doctor', { doctor })
      .leftJoinAndSelect('medicalOrder.client', 'medicalClient')
      .where('medicalClient.dni = :patient', { patient })
      .getMany();
    return orders;
  }

  async sendMail(order: number, mail: number): Promise<void> {
    const directory = path.resolve('static/images/omega.png');
    const foundOrder = await this.repository.findOne({
      where: { id: order },
      select: {
        id: true,
      }
    });

    const { client } = foundOrder;
    const clientEmail: MedicalEmail = client.email.find(e => e.id === mail);

    const url: string = `${this.config.get<string>('APP_TARGET_HOST')}/order/${order}`

    try {
      await this.mailer.send({
        recipients: [
          {
            name: client.fullname,
            address: clientEmail.email
          }
        ],
        subject: 'Resultados exámenes ocupacionales',
        placeholderReplacements: {
          patientFullname: client.fullname,
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
      this.repository.findOneAndUpdate({ id: order }, { mailStatus: false });
      Logger.error(error);
      throw error;
    }
    this.repository.findOneAndUpdate({ id: order }, { mailStatus: true });
  }
}
