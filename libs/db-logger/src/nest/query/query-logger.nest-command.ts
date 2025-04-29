import { Injectable, Provider } from "@nestjs/common";
import { InjectLoggerRepository } from "../inject/repository.inject";
import { LoggerRepository } from "@db-logger/db-logger/application/repository/logger.repository";
import { ReadLoggerQuery } from "@db-logger/db-logger/application/query/read-logger.query";
import { ReadLoggerQueryToken } from "../inject/query.inject";

@Injectable()
class ReadLoggerNestQuery extends ReadLoggerQuery {
    constructor(
        @InjectLoggerRepository() repository: LoggerRepository
    ) {
        super(repository);
    }
}

export const ReadLoggerQueryProvider: Provider = {
    provide: ReadLoggerQueryToken,
    useClass: ReadLoggerNestQuery
}