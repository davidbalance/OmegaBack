import { Inject, Injectable } from "@nestjs/common";
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from "nest-winston";
import { Logform, format, transports } from "winston";
import { TypeOrmTransport } from "../transport/typeorm.transport";
import { TransportStreamOptions } from "winston-transport";
import { LoggerWritter } from "../interfaces/logger-writter.interface";

@Injectable()
export class WinstonLoggerConfig implements WinstonModuleOptionsFactory {

    constructor(
        @Inject(LoggerWritter) private readonly service: LoggerWritter
    ) { }

    createWinstonModuleOptions(): WinstonModuleOptions | Promise<WinstonModuleOptions> {
        const loggerFormat = format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.colorize({ all: true }),
            format.printf((info) => {
                return `${info.timestamp} [${info.level}]:${info.message}`;
            })
        );

        return {
            transports: [
                this.consoleTransport(loggerFormat),
                this.typeOrmTransport({ level: 'warn', format: loggerFormat }),
                this.typeOrmTransport({ level: 'error', format: loggerFormat }),
            ]
        }
    }

    consoleTransport(format: Logform.Format) {
        return new transports.Console({
            format: format
        });
    }

    typeOrmTransport(streamOptions: TransportStreamOptions) {
        return new TypeOrmTransport(this.service, streamOptions)
    }
}