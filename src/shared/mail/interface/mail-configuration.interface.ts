export interface SMTPServerConfiguration {
    host: string;
    port: number;
    secure: boolean;
}

export interface SMTPUser {
    user: string;
    password: string
}

export interface MailSender {
    name: string;
    address: string;
}

export interface SMTPConfiguration {
    server: SMTPServerConfiguration,
    user: SMTPUser,
    sender: MailSender
}