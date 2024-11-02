import { Type } from "@nestjs/common";
import { Address, Attachment } from "nodemailer/lib/mailer";

export type MailerTemplateOptions = {
    name: string;
    path: string;
}

export type MailerSMTPServerOptions = {
    host: string;
    port: number;
    secure: boolean;
}

export type MailerAuthOptions = {
    user: string;
    password: string;
}

export interface MailerModuleOptions {
    template: MailerTemplateOptions,
    server: MailerSMTPServerOptions,
    auth: MailerAuthOptions
    default: Address;
}

export type MailerSender = {
    from?: Address;
    recipients: Address[];
    content: string,
    subject: string;
    attachments?: Attachment[]
}