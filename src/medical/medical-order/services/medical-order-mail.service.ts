import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@/shared/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { MedicalOrderRepository } from '../repositories/medical-order.repository';
import { MedicalEmailEntity } from '@/medical/medical-client/entities/medical-email.entity';
import { NEST_PATH } from '@/shared/nest-ext/nest-path/inject-token';
import { NestPath } from '@/shared/nest-ext/nest-path/nest-path.type';
import { HandlebarsService } from '@/shared/handlebars/handlebars.service';
import { ServerConfig, ServerConfigName } from '@/shared/config/server.config';

@Injectable()
export class MedicalOrderMailService {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
    @Inject(MailerService) private readonly mailer: MailerService,
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(NEST_PATH) private readonly path: NestPath,
    @Inject(HandlebarsService) private readonly handlebars: HandlebarsService
  ) { }

  async send(order: number, mail: number): Promise<void> {
    const server = this.config.get<ServerConfig>(ServerConfigName);

    const directory = this.path.resolve('static/images/omega.png');
    const foundOrder = await this.repository.findOne({
      where: { id: order },
      select: { id: true },
      relations: { client: { email: true } }
    });

    const { client } = foundOrder;
    const clientEmail: MedicalEmailEntity = client.email.find(e => e.id === mail);

    const url: string = `${server.app_client}/order/${order}`

    const fullname = `${client.name} ${client.lastname}`;

    const content = this.handlebars.loadTemplate()({
      patientFullname: fullname,
      url: url
    });

    try {
      await this.mailer.send({
        recipients: [{ name: fullname, address: clientEmail.email }],
        subject: 'Resultados exámenes ocupacionales',
        content: content,
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
