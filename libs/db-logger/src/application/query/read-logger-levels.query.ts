import { QueryHandlerAsync } from "@shared/shared/application";
import { LoggerRepository } from "../repository/logger.repository";
import { LoggerLevelModel } from "@db-logger/db-logger/core/model/logger-level.model";

export class ReadLoggerLevelsQuery implements QueryHandlerAsync<undefined, LoggerLevelModel[]> {

    constructor(
        private readonly repository: LoggerRepository
    ) { }

    async handleAsync(): Promise<LoggerLevelModel[]> {
        const data = await this.repository.retriveLevels();
        return data;
    }
}