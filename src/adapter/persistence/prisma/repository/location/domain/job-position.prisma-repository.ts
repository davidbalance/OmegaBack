import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { JobPosition, JobPositionProps } from "@omega/location/core/domain/job-position/job-position.domain";
import { JobPositionRepository } from "@omega/location/application/repository/aggregate.repositories";
import { JobPositionDomainMapper } from "../../../mapper/location/domain/job-position.domain-mapper";
import { JobPositionIsEvent, JobPositionRemovedEventPayload, JobPositionRenamedEventPayload } from "@omega/location/core/domain/job-position/events/job-position.event";
import { JobPositionAggregateRepositoryToken } from "@omega/location/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class JobPositionPrismaRepository implements JobPositionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<JobPositionProps>): Promise<JobPosition | null> {
        try {
            const where = PrismaFilterMapper.map<JobPositionProps, Prisma.JobPositionWhereInput>(filter.filter);
            const value = await this.prisma.jobPosition.findFirst({ where: where });
            return value ? JobPositionDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: JobPosition): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<JobPosition>(event))
                await this.createJobPosition(aggregate);

            else if (JobPositionIsEvent.isJobPositionRenamedEvent(event))
                await this.renameJobPosition(event.value);

            else if (JobPositionIsEvent.isJobPositionRemovedEvent(event))
                await this.removeJobPosition(event.value);
        }
    }

    async createJobPosition(value: JobPosition): Promise<void> {
        try {
            const data = JobPositionDomainMapper.toPrisma(value);
            await this.prisma.jobPosition.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async renameJobPosition(value: JobPositionRenamedEventPayload): Promise<void> {
        try {
            await this.prisma.jobPosition.update({ where: { id: value.jobPositionId }, data: { name: value.jobPositionName } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeJobPosition(value: JobPositionRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.jobPosition.delete({ where: { id: value.jobPositionId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const JobPositionAggregateRepositoryProvider: Provider = {
    provide: JobPositionAggregateRepositoryToken,
    useClass: JobPositionPrismaRepository,
}