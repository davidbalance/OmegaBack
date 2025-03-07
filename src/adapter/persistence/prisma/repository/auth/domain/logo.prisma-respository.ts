import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { Prisma } from "@prisma/client";
import { Logo, LogoProps } from "@omega/auth/core/domain/logo/logo.domain";
import { LogoRepository } from "@omega/auth/application/repository/logo/aggregate.repositories";
import { LogoDomainMapper } from "../../../mapper/auth/domain/logo.domain-mapper";
import { LogoAggregateRepositoryToken } from "@omega/auth/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class LogoPrismaRepository implements LogoRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<LogoProps>): Promise<Logo | null> {
        try {
            const where = PrismaFilterMapper.map<LogoProps, Prisma.LogoWhereInput>(filter.filter);
            const value = await this.prisma.logo.findFirst({
                where: where
            });
            return value ? LogoDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: Logo): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<Logo>(event))
                await this.createLogo(aggregate);
        }
    }

    async createLogo(value: Logo): Promise<void> {
        try {
            const data = LogoDomainMapper.toPrisma(value);
            await this.prisma.logo.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const LogoAggregateRepositoryProvider: Provider = {
    provide: LogoAggregateRepositoryToken,
    useClass: LogoPrismaRepository,
}