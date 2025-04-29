import { Injectable, Provider } from "@nestjs/common";
import { InjectLoggerRepository } from "../inject/repository.inject";
import { LoggerRepository } from "@db-logger/db-logger/application/repository/logger.repository";
import { WriteLoggerCommandToken } from "../inject/command.inject";
import { WriteLoggerCommand } from "@db-logger/db-logger/application/command/write-logger.command";

@Injectable()
class WriteLoggerNestCommand extends WriteLoggerCommand {
    constructor(
        @InjectLoggerRepository() repository: LoggerRepository
    ) {
        super(repository);
    }
}

export const WriteLoggerCommandProvider: Provider = {
    provide: WriteLoggerCommandToken,
    useClass: WriteLoggerNestCommand
}