import { Module } from "@nestjs/common";
import { WinstonModule as NestWinston } from 'nest-winston';
import { DbLoggerModule } from "./db-logger.module";
import { WinstonLoggerConfig } from "./winston/logger.config";

@Module({
    imports: [
        NestWinston.forRootAsync({
            imports: [DbLoggerModule],
            useClass: WinstonLoggerConfig
        })]
})
export class WinstonModule { }