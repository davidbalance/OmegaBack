import { Injectable, Provider } from "@nestjs/common";
import { InjectLoggerRepository } from "../inject/repository.inject";
import { LoggerRepository } from "@db-logger/db-logger/application/repository/logger.repository";
import { ReadLoggerLevelQueryToken } from "../inject/query.inject";
import { ReadLoggerLevelsQuery } from "@db-logger/db-logger/application/query/read-logger-levels.query";

@Injectable()
class ReadLoggerLevelsNestQuery extends ReadLoggerLevelsQuery {
    constructor(
        @InjectLoggerRepository() repository: LoggerRepository
    ) {
        super(repository);
    }
}

export const ReadLoggerLevelQueryProvider: Provider = {
    provide: ReadLoggerLevelQueryToken,
    useClass: ReadLoggerLevelsNestQuery
}