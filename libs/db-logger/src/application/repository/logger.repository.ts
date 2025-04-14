import { SearchCriteria } from "@shared/shared/domain";
import { LoggerModel } from "../../core/model/logger.model";
import { Logger } from "../../core/domain/logger.domain";
import { CountRepository } from "@shared/shared/providers";
import { LoggerLevelModel } from "@db-logger/db-logger/core/model/logger-level.model";

export type LoggerRepository = {
    write(aggregate: Logger): Promise<void>;
    read(filter: SearchCriteria<LoggerModel>): Promise<LoggerModel[]>;
    retriveLevels(): Promise<LoggerLevelModel[]>;
} & CountRepository<LoggerModel>