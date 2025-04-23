import { Injectable } from "@nestjs/common";
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from "nest-winston";
import { format, transports } from 'winston';
import { InjectCommand } from "../nest/inject/command.inject";
import { PersistenceTransport } from "./persistence.transport";
import { formatDate } from "date-fns";
import { WriteLoggerCommand } from "../application/command/write-logger.command";

@Injectable()
export class WinstonLoggerConfig implements WinstonModuleOptionsFactory {

    constructor(
        @InjectCommand('WriteLogger') private readonly write: WriteLoggerCommand
    ) { }

    createWinstonModuleOptions(): Promise<WinstonModuleOptions> | WinstonModuleOptions {
        const loggerFormat = format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.colorize({ all: true }),
            format.printf((info: { timestamp: Date, level: string, message: string }) => `${formatDate(info.timestamp, 'yyyy-MM-dd HH:mm:ss')} [${info.level}]:${info.message}`)
        );

        return {
            transports: [
                new transports.Console({ level: 'debug', format: loggerFormat }),
                new PersistenceTransport(this.write, { level: 'warn', format: loggerFormat }),
                new PersistenceTransport(this.write, { level: 'error', format: loggerFormat }),
            ]
        }
    }
}