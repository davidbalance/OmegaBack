import { Address, Attachment } from "nodemailer/lib/mailer";
import { SmtpConfig } from "../config/smtp.config";

export interface MailerModuleOptions extends SmtpConfig { }

export type MailerSender = {
    from?: Address;
    recipients: Address[];
    content: string,
    subject: string;
    attachments?: Attachment[]
}