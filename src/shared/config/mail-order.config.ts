import { registerAs } from "@nestjs/config";

export const MailOrderConfigName = 'MailOrderConfig';

export interface MailOrderConfig {
    name: string;
    template: string;
}

export default registerAs(MailOrderConfigName, (): MailOrderConfig => ({
    template: process.env.MAIL_ORDER_TEMPLATE,
    name: process.env.MAIL_ORDER_NAME,
}));