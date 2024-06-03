import { Inject, Injectable, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { MAIL_TEMPLATE_PATH, MAIL_TEMPLATE_PROVIDER } from './mail.provider';
import path from 'path';
import { readFileSync } from 'fs';
import { MailTo } from './interface/mail-to.interface';
import Mail from 'nodemailer/lib/mailer';


@Injectable()
export class MailService {
    constructor(
        @Inject(ConfigService) private readonly config: ConfigService,
        @Inject(MAIL_TEMPLATE_PROVIDER) private readonly templateName: string,
        @Inject(MAIL_TEMPLATE_PATH) private readonly templatePath: string
    ) { }

    private mailTransporter() {
        const transporter = nodemailer.createTransport({
            host: this.config.get<string>('SMTP_MAIL_HOST'),
            port: this.config.get<number>('SMTP_MAIL_PORT'),
            secure: this.config.get<boolean>('SMTP_MAIL_SECURE', false),
            auth: {
                user: this.config.get<string>('SMTP_MAIL_AUTH_USER'),
                pass: this.config.get<string>('SMTP_MAIL_AUTH_PASSWORD'),
            }
        });

        return transporter;
    }

    private loadTemplate = (templateName: string): handlebars.TemplateDelegate => {
        const templatesFolderPath: string = path.resolve(this.templatePath);
        const templatePath = path.join(templatesFolderPath, templateName);
        const templateSource = readFileSync(templatePath, 'utf-8');
        const compile = handlebars.compile(templateSource)
        return compile;
    }

    public async send(mail: MailTo, metadata: any, attachments?: Mail.Attachment[], data?: any): Promise<void> {
        const template = this.loadTemplate(this.templateName);
        const html = template(metadata);
        const transporter = this.mailTransporter();

        const options: Mail.Options = {
            from: {
                name: this.config.get<string>('APP_NAME'),
                address: this.config.get<string>('DEFAULT_MAIL_FROM')
            },
            to: mail.email,
            subject: mail.subject,
            html: html,
            attachments: attachments ?? []
        }
        try {
            await transporter.sendMail(options);
        } catch (error) {
            Logger.error(error);
        }
    }
}
