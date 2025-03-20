import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Logger as LocalLogger } from "@db-logger/db-logger/core/domain/logger.domain";
import { LoggerDomainMapper } from "../../../mapper/logger/domain/logger.domain-mapper";
import { LoggerRepositoryToken } from "@db-logger/db-logger/nest/inject/repository.inject";
import { Prisma } from "@prisma/client";
import { RepositoryError } from "@shared/shared/domain/error";
import { LoggerRepository } from "@db-logger/db-logger/application/repository/logger.repository";
import { LoggerModel } from "@db-logger/db-logger/core/model/logger.model";
import { LoggerLevelModel } from "@db-logger/db-logger/core/model/logger-level.model";
import { LoggerLevelModelMapper } from "../../../mapper/logger/model/logger-level.model-mapper";

@Injectable()
export class LoggerPrismaRepository implements LoggerRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }


    async retriveLevels(): Promise<LoggerLevelModel[]> {
        try {
            const values = await this.prisma.loggerLevelModel.findMany();
            return values.map(e => LoggerLevelModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async write(aggregate: LocalLogger): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<LocalLogger>(event))
                await this.createLogger(aggregate);
        }
    }

    async read(filter: SearchCriteria<LoggerModel>): Promise<LoggerModel[]> {
        try {
            const where = PrismaFilterMapper.map<LoggerModel, Prisma.LoggerWhereInput>(filter.filter);
            const values = await this.prisma.logger.findMany({
                where: where,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => LoggerDomainMapper.toDomain(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async countAsync(filter: (FilterGroup<LoggerModel> | Filter<LoggerModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<LoggerModel, Prisma.LoggerWhereInput>(filter);
            const value = await this.prisma.logger.count({ where: where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async createLogger(value: LocalLogger): Promise<void> {
        try {
            const data = LoggerDomainMapper.toPrisma(value);
            await this.prisma.logger.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

}

export const LoggerRepositoryProvider: Provider = {
    provide: LoggerRepositoryToken,
    useClass: LoggerPrismaRepository,
}