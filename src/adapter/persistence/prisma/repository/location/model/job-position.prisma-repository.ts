import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";
import { JobPositionModelMapper } from "../../../mapper/location/model/job-position.model-mapper";
import { JobPositionRepository } from "@omega/location/application/repository/model.repositories";
import { JobPositionModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class JobPositionPrismaRepository implements JobPositionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (Filter<JobPositionModel> | FilterGroup<JobPositionModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<JobPositionModel, Prisma.JobPositionModelWhereInput>(filter);
            const value = await this.prisma.jobPositionModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<JobPositionModel>): Promise<JobPositionModel[]> {
        try {
            const where = PrismaFilterMapper.map<JobPositionModel, Prisma.JobPositionModelWhereInput>(filter.filter);
            const values = await this.prisma.jobPositionModel.findMany({
                where,
                orderBy: { ...filter.order }
            });
            return values.map(e => JobPositionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<JobPositionModel> | Filter<JobPositionModel>)[]): Promise<JobPositionModel | null> {
        try {
            const where = PrismaFilterMapper.map<JobPositionModel, Prisma.JobPositionModelWhereInput>(filter);
            const value = await this.prisma.jobPositionModel.findFirst({ where });
            return value ? JobPositionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const JobPositionModelRepositoryProvider: Provider = {
    provide: JobPositionModelRepositoryToken,
    useClass: JobPositionPrismaRepository,
}