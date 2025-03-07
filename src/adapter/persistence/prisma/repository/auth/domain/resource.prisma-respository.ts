import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { Prisma } from "@prisma/client";
import { ResourceRepository } from "@omega/auth/application/repository/resource/aggregate.repositories";
import { Resource, ResourceProps } from "@omega/auth/core/domain/resource/resource.domain";
import { ResourceDomainMapper } from "../../../mapper/auth/domain/resource.domain-mapper";
import { ResourceIsEvent, ResourceRemovedEventPayload } from "@omega/auth/core/domain/resource/events/resource.events";
import { ResourceAggregateRepositoryToken } from "@omega/auth/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ResourcePrismaRepository implements ResourceRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<ResourceProps>): Promise<Resource | null> {
        try {
            const where = PrismaFilterMapper.map<ResourceProps, Prisma.ResourceWhereInput>(filter.filter);
            const value = await this.prisma.resource.findFirst({
                where: where
            });
            return value ? ResourceDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: Resource): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<Resource>(event))
                await this.createResource(aggregate);

            if (ResourceIsEvent.isResourceEditedEvent(event))
                await this.editResource(event.value);

            if (ResourceIsEvent.isResourceRemovedEvent(event))
                await this.removeResource(event.value);
        }
    }

    async createResource(value: Resource): Promise<void> {
        try {
            const data = ResourceDomainMapper.toPrisma(value);
            await this.prisma.resource.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async editResource(value: Resource): Promise<void> {
        try {
            await this.prisma.resource.update({
                where: { id: value.id },
                data: {
                    address: value.address,
                    icon: value.icon,
                    label: value.label,
                    order: value.order
                }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeResource(value: ResourceRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.resource.delete({ where: { id: value.resourceId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ResourceAggregateRepositoryProvider: Provider = {
    provide: ResourceAggregateRepositoryToken,
    useClass: ResourcePrismaRepository,
}