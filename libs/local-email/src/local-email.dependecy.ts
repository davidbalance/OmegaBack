import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import { LocalEmailConfig, LocalEmailConfigName } from './config/local-email.config';

export type Mailer = Transporter;
export type MailerSendOptions = SendMailOptions;
export const MailerToken: string = "LOCAL_MAILER";
export const loadMailer = (config: ConfigService): Mailer => {
    const mailer = config.getOrThrow<LocalEmailConfig>(LocalEmailConfigName);
    return createTransport({
        host: mailer.server_host,
        port: mailer.server_port,
        secure: mailer.server_secure,
        auth: {
            user: mailer.auth_user,
            pass: mailer.auth_password
        }
    }) as Transporter;
}