import { Inject, Injectable, Logger } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './mailer.module-definition';
import { MailerModuleOptions, MailerSender } from './mailer.interface';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'path';
import { readFileSync } from 'fs';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private readonly options: MailerModuleOptions
    ) { }

    private mailTransporter(): nodemailer.Transporter {
        const transporter = nodemailer.createTransport({
            host: this.options.server.host,
            port: this.options.server.port,
            secure: this.options.server.secure,
            auth: {
                user: this.options.auth.user,
                pass: this.options.auth.password
            }
        });
        return transporter;
    }

    private loadTemplate(): handlebars.TemplateDelegate {
        const templateFolder: string = path.resolve(this.options.template.path);
        const template: string = path.join(templateFolder, this.options.template.name);
        const source: string = readFileSync(template, 'utf-8');
        const compile = handlebars.compile(source);
        return compile;
    }

    public async send(options: MailerSender): Promise<any> {
        const { from, recipients, subject, placeholderReplacements, attachments } = options;
        const template: string = this.loadTemplate()(placeholderReplacements);
        const transporter = this.mailTransporter();

        const mailOptions: Mail.Options = {
            from: from ?? this.options.default,
            to: recipients,
            subject: subject,
            html: template,
            attachments: attachments
        }

        try {
            const result = await transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }
}
