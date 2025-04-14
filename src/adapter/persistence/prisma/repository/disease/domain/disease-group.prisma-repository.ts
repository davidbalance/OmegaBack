import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { PrismaService } from "../../../prisma.service";
import { DiseaseGroupProps, DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { DiseaseGroupDomainMapper } from "../../../mapper/disease/domain/disease-group.domain-mapper";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { DiseaseGroupDiseaseMovedEventPayload, DiseaseGroupDiseaseRemovedEventPayload, DiseaseGroupIsEvent, DiseaseGroupRemovedEventPayload, DiseaseGroupRenamedEventPayload } from "@omega/disease/core/domain/events/disease-group.events";
import { Disease } from "@omega/disease/core/domain/disease.domain";
import { DiseaseDomainMapper } from "../../../mapper/disease/domain/disease.domain-mapper";
import { DiseaseIsEvent, DiseaseRenamedEventPayload } from "@omega/disease/core/domain/events/disease.events";
import { DiseaseGroupAggregateRepositoryToken } from "@omega/disease/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class DiseaseGroupPrismaRepository implements DiseaseGroupRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<DiseaseGroupProps>): Promise<DiseaseGroup | null> {
        try {
            const where = PrismaFilterMapper.map<DiseaseGroupProps, Prisma.DiseaseGroupWhereInput>(filter.filter);
            const value = await this.prisma.diseaseGroup.findFirst({
                include: { diseases: true },
                where: where
            });
            return value ? DiseaseGroupDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: DiseaseGroup): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<DiseaseGroup>(event))
                await this.createDiseaseGroup(aggregate);

            else if (DiseaseGroupIsEvent.isDiseaseGroupRenamedEvent(event))
                await this.renameDiseaseGroup(event.value);

            else if (DiseaseGroupIsEvent.isDiseaseGroupRemovedEvent(event))
                await this.removeDiseaseGroup(event.value);

            else if (DiseaseGroupIsEvent.isDiseaseGroupDiseaseAddedEvent(event))
                await this.addDisease(event.value);

            else if (DiseaseGroupIsEvent.isDiseaseGroupDiseaseRemovedEvent(event))
                await this.removeDisease(event.value);

            else if (DiseaseGroupIsEvent.isDiseaseGroupDiseaseMovedEvent(event))
                await this.moveDisease(event.value);

            else if (DiseaseIsEvent.isDiseaseRenamedEvent(event))
                await this.renameDisease(event.value);
        }
    }

    async createDiseaseGroup(value: DiseaseGroup): Promise<void> {
        try {
            const data = DiseaseGroupDomainMapper.toPrisma(value);
            await this.prisma.diseaseGroup.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async renameDiseaseGroup(value: DiseaseGroupRenamedEventPayload): Promise<void> {
        try {
            await this.prisma.diseaseGroup.update({ where: { id: value.groupId }, data: { name: value.name } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeDiseaseGroup(value: DiseaseGroupRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.diseaseGroup.delete({ where: { id: value.groupId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addDisease(value: Disease): Promise<void> {
        try {
            const data = DiseaseDomainMapper.toPrisma(value);
            await this.prisma.disease.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeDisease(value: DiseaseGroupDiseaseRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.disease.delete({ where: { id: value.diseaseId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async moveDisease(value: DiseaseGroupDiseaseMovedEventPayload): Promise<void> {
        try {
            await this.prisma.disease.update({ where: { id: value.diseaseId }, data: { groupId: value.targetId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async renameDisease(value: DiseaseRenamedEventPayload): Promise<void> {
        try {
            await this.prisma.disease.update({ where: { id: value.diseaseId }, data: { name: value.diseaseName } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const DiseaseGroupAggregateRepositoryProvider: Provider = {
    provide: DiseaseGroupAggregateRepositoryToken,
    useClass: DiseaseGroupPrismaRepository,
}