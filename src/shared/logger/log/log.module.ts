import { Module, Provider } from "@nestjs/common";
import { LogEntity } from "./entities/log.entity";
import { LogController } from "./controllers/log.controller";
import { LogService } from "./log.service";
import { LogRepository } from "./log.repository";
import { LoggerWritter } from '../interfaces/logger-writter.interface'
import { SqlDatabaseModule } from "@/shared/sql-database/sql-database.module";
import { LogPaginationController } from "./controllers/log-pagination.controller";
import { LogPaginationService } from "./log-pagination.service";

const LoggerProvider: Provider = { provide: LoggerWritter, useClass: LogService }

@Module({
    imports: [
        SqlDatabaseModule.forFeature([
            LogEntity
        ])
    ],
    controllers: [
        LogController,
        LogPaginationController
    ],
    providers: [
        LoggerProvider,
        LogService,
        LogPaginationService,
        LogRepository
    ],
    exports: [LoggerProvider]
})
export class LogModule { }