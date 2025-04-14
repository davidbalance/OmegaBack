import { Inject, Injectable, Logger, Provider } from '@nestjs/common';
import { EmailProviderToken } from '@shared/shared/nest/inject';
import { ConfigService } from '@nestjs/config';
import { EmailProvider, EmailProviderPayload } from '@shared/shared/providers/email.provider';
import { LocalEmailConfig, LocalEmailConfigName } from './config/local-email.config';
import { Mailer, MailerSendOptions, MailerToken } from './local-email.dependecy';
import { InternalError } from '@shared/shared/domain/error';

@Injectable()
export class LocalEmailService implements EmailProvider {

    constructor(
        @Inject(MailerToken) private readonly transporter: Mailer,
        @Inject(ConfigService) private readonly config: ConfigService
    ) { }

    async send(value: EmailProviderPayload): Promise<void> {
        let mailer: LocalEmailConfig | null = null;
        try {
            mailer = this.config.getOrThrow<LocalEmailConfig>(LocalEmailConfigName);
        } catch (error) {
            Logger.error(error);
            throw new InternalError('Config Missing.');
        }
        const mailOptions: MailerSendOptions = {
            from: value.from ?? mailer.auth_user,
            to: value.recipient,
            subject: value.subject,
            html: value.type === 'html' ? value.content : undefined,
            text: value.type === 'text' ? value.content : undefined,
            attachments: value.attachments
        }

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            Logger.error(error);
            throw new InternalError('Fail to send email.');
        }
    }
}

export const LocalEmailProvider: Provider = {
    provide: EmailProviderToken,
    useClass: LocalEmailService
}
