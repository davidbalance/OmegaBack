import { Inject } from "@nestjs/common";

export const ReadLoggerQueryToken = 'ReadLogger';
export const ReadLoggerLevelQueryToken = 'ReadLoggerLevel';

const command = {
    ReadLogger: ReadLoggerQueryToken,
    ReadLoggerLevel: ReadLoggerLevelQueryToken,
}

export const InjectQuery = (token: keyof typeof command) => Inject(command[token]);