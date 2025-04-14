import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { Management, ManagementProps } from "@omega/location/core/domain/management/management.domain";
import { ManagementRepository } from "@omega/location/application/repository/aggregate.repositories";
import { ManagementIsEvent, ManagementRemovedEventPayload, ManagementRenamedEventPayload } from "@omega/location/core/domain/management/events/management.event";
import { ManagementDomainMapper } from "../../../mapper/location/domain/management.domain-mapper";
import { ManagementAggregateRepositoryToken } from "@omega/location/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ManagementPrismaRepository implements ManagementRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<ManagementProps>): Promise<Management | null> {
        try {
            const where = PrismaFilterMapper.map<ManagementProps, Prisma.ManagementWhereInput>(filter.filter);
            const value = await this.prisma.management.findFirst({ where: where });
            return value ? ManagementDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: Management): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<Management>(event))
                await this.createManagement(aggregate);

            else if (ManagementIsEvent.isManagementRenamedEvent(event))
                await this.renameManagement(event.value);

            else if (ManagementIsEvent.isManagementRemovedEvent(event))
                await this.removeManagement(event.value);
        }
    }

    async createManagement(value: Management): Promise<void> {
        try {
            const data = ManagementDomainMapper.toPrisma(value);
            await this.prisma.management.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async renameManagement(value: ManagementRenamedEventPayload): Promise<void> {
        try {
            await this.prisma.management.update({ where: { id: value.managementId }, data: { name: value.managementName } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeManagement(value: ManagementRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.management.delete({ where: { id: value.managementId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ManagementAggregateRepositoryProvider: Provider = {
    provide: ManagementAggregateRepositoryToken,
    useClass: ManagementPrismaRepository,
}