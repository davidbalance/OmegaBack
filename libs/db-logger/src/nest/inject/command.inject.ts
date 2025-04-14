import { Inject } from "@nestjs/common";

export const WriteLoggerCommandToken = 'WriteLoggerCommand';

const command = {
    WriteLogger: WriteLoggerCommandToken
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);