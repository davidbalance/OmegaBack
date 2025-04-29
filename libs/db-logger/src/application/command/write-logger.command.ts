import { CreateLoggerPayload } from "@db-logger/db-logger/core/domain/payloads/create-logger.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { Logger } from "@db-logger/db-logger/core/domain/logger.domain";
import { LoggerRepository } from "../repository/logger.repository";

export type WriteLoggerCommandPayload = CreateLoggerPayload;
export class WriteLoggerCommand implements CommandHandlerAsync<WriteLoggerCommandPayload, void> {
    constructor(
        private readonly repository: LoggerRepository
    ) { }
    async handleAsync(value: WriteLoggerCommandPayload): Promise<void> {
        const logger = Logger.create(value);
        await this.repository.write(logger);
    }
}