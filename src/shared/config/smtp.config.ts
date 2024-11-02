import { registerAs } from "@nestjs/config";

export const SmtpConfigName = 'SmtpConfig';

export interface SmtpConfig {
    auth_user: string;
    auth_password: string;
    default_name: string;
    default_address: string;
    server_host: string;
    server_port: number;
    server_secure: boolean;
}

export default registerAs(SmtpConfigName, (): SmtpConfig => ({
    auth_user: process.env.SMTP_MAIL_AUTH_USER,
    auth_password: process.env.SMTP_MAIL_AUTH_PASSWORD,
    default_name: process.env.SMTP_DEFAULT_APP_NAME,
    default_address: process.env.SMTP_DEFAULT_MAIL_FROM,
    server_host: process.env.SMTP_MAIL_HOST,
    server_port: Number(process.env.SMTP_MAIL_PORT),
    server_secure: process.env.SMTP_MAIL_SECURE === 'true' || process.env.SMTP_MAIL_SECURE === 'TRUE' || process.env.SMTP_MAIL_SECURE === 'True',
}));