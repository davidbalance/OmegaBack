import { Inject, Injectable } from '@nestjs/common';
import path from 'path';
import { MailerService } from '@/shared/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { MedicalEmail } from '@/medical/medical-client/entities/medical-email.entity';
import { MedicalOrderRepository } from '../repositories/medical-order.repository';

@Injectable()
export class MedicalOrderMailService {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
    @Inject(MailerService) private readonly mailer: MailerService,
    @Inject(ConfigService) private readonly config: ConfigService
  ) { }

  async send(order: number, mail: number): Promise<void> {
    const directory = path.resolve('static/images/omega.png');
    const foundOrder = await this.repository.findOne({
      where: { id: order },
      select: { id: true },
      relations: { client: { email: true } }
    });

    const { client } = foundOrder;
    const clientEmail: MedicalEmail = client.email.find(e => e.id === mail);

    const url: string = `${this.config.get<string>('APP_TARGET_HOST')}/order/${order}`

    const fullname = `${client.name} ${client.lastname}`;

    try {
      await this.mailer.send({
        recipients: [{ name: fullname, address: clientEmail.email }],
        subject: 'Resultados exámenes ocupacionales',
        placeholderReplacements: {
          patientFullname: fullname,
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
      throw error;
    }
    this.repository.findOneAndUpdate({ id: order }, { mailStatus: true });
  }
}
