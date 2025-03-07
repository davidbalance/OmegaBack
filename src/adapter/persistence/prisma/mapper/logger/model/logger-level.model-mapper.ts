import { LoggerLevelModel } from "@db-logger/db-logger/core/model/logger-level.model";
import { LoggerLevelModel as PrismaLoggerLevel } from "@prisma/client";

export class LoggerLevelModelMapper {
    static toModel(value: PrismaLoggerLevel): LoggerLevelModel {
        return new LoggerLevelModel({ ...value });
    }
}