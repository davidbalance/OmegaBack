import { Logger as LocalLogger } from "@db-logger/db-logger/core/domain/logger.domain";
import { LoggerModel } from "@db-logger/db-logger/core/model/logger.model";
import { Prisma, Logger as PrismaLogger } from "@prisma/client";

export class LoggerDomainMapper {
    static toPrisma(value: LocalLogger): Prisma.LoggerUncheckedCreateInput {
        return {
            id: value.id,
            level: value.level,
            message: value.message,
            timestamp: value.timestamp
        };
    }

    static toDomain(value: PrismaLogger): LoggerModel {
        return new LoggerModel({ ...value });
    }
}