import { LoggerLevelModel } from "@db-logger/db-logger/core/model/logger-level.model";
import { LoggerLevelModel as PrismaLoggerLevel } from "@prisma/client";
import { LoggerLevelModelMapper } from "../logger-level.model-mapper";

describe('LoggerLevelModelMapper', () => {
    it('should correctly map a PrismaLoggerLevel to an LoggerLevelModel instance', () => {
        const prismaValue: PrismaLoggerLevel = {
            level: 'Warn'
        };

        const expectedValue = new LoggerLevelModel({ ...prismaValue });
        const result = LoggerLevelModelMapper.toModel(prismaValue);
        expect(result.level).toBe(expectedValue.level);
    });
});
