import { Inject, Injectable, Logger } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './mailer.module-definition';
import { MailerModuleOptions, MailerSender } from './mailer.interface';
import { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { NEST_NODEMAILER } from '../nest-ext/nest-nodemailer/inject-token';
import { NestNodemailer } from '../nest-ext/nest-nodemailer/nest-nodemailer.ype';

@Injectable()
export class MailerService {

    private readonly transporter: Transporter

    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private readonly options: MailerModuleOptions,
        @Inject(NEST_NODEMAILER) nodemailer: NestNodemailer
    ) {
        this.transporter = nodemailer.createTransport({
            host: options.server_host,
            port: options.server_port,
            secure: options.server_secure,
            auth: {
                user: options.auth_user,
                pass: options.auth_password
            }
        });
    }

    public async send(options: MailerSender): Promise<any> {
        const { from, recipients, subject, content, attachments } = options;

        const mailOptions: Mail.Options = {
            from: from ?? this.options.auth_user,
            to: recipients,
            subject: subject,
            html: content,
            attachments: attachments
        }

        try {
            const result = await this.transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }
}
