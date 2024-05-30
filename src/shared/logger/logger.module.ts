import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonLoggerConfig } from './config/winston-logger.config';
import { LogModule } from './log/log.module';

@Module({
    imports: [
        WinstonModule.forRootAsync({
            imports: [LogModule],
            useClass: WinstonLoggerConfig
        })
    ],
})
export class LoggerModule { }
