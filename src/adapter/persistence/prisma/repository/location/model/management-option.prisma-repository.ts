import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ManagementOptionModel } from "@omega/location/core/models/management/management-option.model";
import { ManagementOptionRepository } from "@omega/location/application/repository/model.repositories";
import { ManagementOptionModelMapper } from "../../../mapper/location/model/management-option.model-mapper";
import { ManagementOptionModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ManagementOptionPrismaRepository implements ManagementOptionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ManagementOptionModel>): Promise<ManagementOptionModel[]> {
        try {
            const where = PrismaFilterMapper.map<ManagementOptionModel, Prisma.ManagementOptionModelWhereInput>(filter.filter);
            const values = await this.prisma.managementOptionModel.findMany({ where });
            return values.map(e => ManagementOptionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ManagementOptionModel> | Filter<ManagementOptionModel>)[]): Promise<ManagementOptionModel | null> {
        try {
            const where = PrismaFilterMapper.map<ManagementOptionModel, Prisma.ManagementOptionModelWhereInput>(filter);
            const value = await this.prisma.managementOptionModel.findFirst({ where });
            return value ? ManagementOptionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ManagementOptionModelRepositoryProvider: Provider = {
    provide: ManagementOptionModelRepositoryToken,
    useClass: ManagementOptionPrismaRepository,
}