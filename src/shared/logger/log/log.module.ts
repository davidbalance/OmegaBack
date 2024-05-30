import { SqlDatabaseModule } from "@/shared/sql-database";
import { Module, Provider } from "@nestjs/common";
import { Log } from "./entities/log.entity";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";
import { LogRepository } from "./log.repository";
import { LoggerWritter } from '../interfaces/logger-writter.interface'

const LoggerProvider: Provider = { provide: LoggerWritter, useClass: LogService }

@Module({
    imports: [
        SqlDatabaseModule.forFeature([Log])
    ],
    controllers: [LogController],
    providers: [
        LoggerProvider,
        LogService,
        LogRepository
    ],
    exports: [LoggerProvider]
})
export class LogModule { }