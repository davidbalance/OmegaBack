import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@/shared/mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { MedicalOrderRepository } from '../repositories/medical-order.repository';
import { MedicalEmailEntity } from '@/medical/medical-client/entities/medical-email.entity';
import { NEST_HANDLEBARS } from '@/shared/nest-ext/nest-handlebars/inject-token';
import { NestHandlebars } from '@/shared/nest-ext/nest-handlebars/nest-handlebars.type';
import { NEST_PATH } from '@/shared/nest-ext/nest-path/inject-token';
import { NestPath } from '@/shared/nest-ext/nest-path/nest-path.type';
import { NEST_FS } from '@/shared/nest-ext/nest-fs/inject-token';
import { NestFS } from '@/shared/nest-ext/nest-fs/nest-fs.type';
import { TemplateDelegate } from 'handlebars'

@Injectable()
export class MedicalOrderMailService {

  constructor(
    @Inject(MedicalOrderRepository) private readonly repository: MedicalOrderRepository,
    @Inject(MailerService) private readonly mailer: MailerService,
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(NEST_HANDLEBARS) private readonly handlebars: NestHandlebars,
    @Inject(NEST_PATH) private readonly path: NestPath,
    @Inject(NEST_FS) private readonly fs: NestFS
  ) { }

  private loadTemplate(): TemplateDelegate {
    const templateFolder: string = this.path.resolve('templates/mail');
    const template: string = this.path.join(templateFolder, 'mail.hbs');
    const source: string = this.fs.readFileSync(template, 'utf-8');
    const compile = this.handlebars.compile(source);
    return compile;
  }

  async send(order: number, mail: number): Promise<void> {
    const directory = this.path.resolve('static/images/omega.png');
    const foundOrder = await this.repository.findOne({
      where: { id: order },
      select: { id: true },
      relations: { client: { email: true } }
    });

    const { client } = foundOrder;
    const clientEmail: MedicalEmailEntity = client.email.find(e => e.id === mail);

    const url: string = `${this.config.get<string>('APP_TARGET_HOST')}/order/${order}`

    const fullname = `${client.name} ${client.lastname}`;

    const content = this.loadTemplate()({
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
