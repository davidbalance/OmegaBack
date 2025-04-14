export type EmailAttachment = {
    filename: string;
    path: string;
    cid: string;
}

export type EmailProviderPayload = {
    from?: string;
    recipient: string | string[];
    subject: string;
    content: string;
    type: "html" | "text";
    attachments?: EmailAttachment[];
}
export interface EmailProvider {
    send(value: EmailProviderPayload): Promise<void>;
}