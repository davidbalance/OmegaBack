import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { AreaRepository } from "@omega/location/application/repository/aggregate.repositories";
import { Area, AreaProps } from "@omega/location/core/domain/area/area.domain";
import { AreaIsEvent, AreaRemovedEventPayload, AreaRenamedEventPayload } from "@omega/location/core/domain/area/events/area.event";
import { AreaDomainMapper } from "../../../mapper/location/domain/area.domain-mapper";
import { AreaAggregateRepositoryToken } from "@omega/location/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class AreaPrismaRepository implements AreaRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<AreaProps>): Promise<Area | null> {
        try {
            const where = PrismaFilterMapper.map<AreaProps, Prisma.AreaWhereInput>(filter.filter);
            const value = await this.prisma.area.findFirst({ where: where });
            return value ? AreaDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: Area): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<Area>(event))
                await this.createArea(aggregate);

            else if (AreaIsEvent.isAreaRenamedEvent(event))
                await this.renameArea(event.value);

            else if (AreaIsEvent.isAreaRemovedEvent(event))
                await this.removeArea(event.value);
        }
    }

    async createArea(value: Area): Promise<void> {
        try {
            const data = AreaDomainMapper.toPrisma(value);
            await this.prisma.area.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async renameArea(value: AreaRenamedEventPayload): Promise<void> {
        try {
            await this.prisma.area.update({ where: { id: value.areaId }, data: { name: value.areaName } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeArea(value: AreaRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.area.delete({ where: { id: value.areaId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const AreaAggregateRepositoryProvider: Provider = {
    provide: AreaAggregateRepositoryToken,
    useClass: AreaPrismaRepository,
}