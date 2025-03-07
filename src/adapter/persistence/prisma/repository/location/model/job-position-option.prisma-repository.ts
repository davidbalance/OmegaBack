import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { JobPositionOptionRepository } from "@omega/location/application/repository/model.repositories";
import { JobPositionOptionModel } from "@omega/location/core/models/jobPosition/job-position-option.model";
import { JobPositionOptionModelMapper } from "../../../mapper/location/model/job-position-option.model-mapper";
import { JobPositionOptionModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class JobPositionOptionPrismaRepository implements JobPositionOptionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<JobPositionOptionModel>): Promise<JobPositionOptionModel[]> {
        try {
            const where = PrismaFilterMapper.map<JobPositionOptionModel, Prisma.JobPositionOptionModelWhereInput>(filter.filter);
            const values = await this.prisma.jobPositionOptionModel.findMany({ where });
            return values.map(e => JobPositionOptionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<JobPositionOptionModel> | Filter<JobPositionOptionModel>)[]): Promise<JobPositionOptionModel | null> {
        try {
            const where = PrismaFilterMapper.map<JobPositionOptionModel, Prisma.JobPositionOptionModelWhereInput>(filter);
            const value = await this.prisma.jobPositionOptionModel.findFirst({ where });
            return value ? JobPositionOptionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const JobPositionOptionModelRepositoryProvider: Provider = {
    provide: JobPositionOptionModelRepositoryToken,
    useClass: JobPositionOptionPrismaRepository,
}