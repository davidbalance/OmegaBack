import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ManagementRepository } from "@omega/location/application/repository/model.repositories";
import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { ManagementModelMapper } from "../../../mapper/location/model/management.model-mapper";
import { ManagementModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ManagementPrismaRepository implements ManagementRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (Filter<ManagementModel> | FilterGroup<ManagementModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<ManagementModel, Prisma.ManagementModelWhereInput>(filter);
            const value = await this.prisma.managementModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<ManagementModel>): Promise<ManagementModel[]> {
        try {
            const where = PrismaFilterMapper.map<ManagementModel, Prisma.ManagementModelWhereInput>(filter.filter);
            const values = await this.prisma.managementModel.findMany({
                where,
                orderBy: { ...filter.order }
            });
            return values.map(e => ManagementModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ManagementModel> | Filter<ManagementModel>)[]): Promise<ManagementModel | null> {
        try {
            const where = PrismaFilterMapper.map<ManagementModel, Prisma.ManagementModelWhereInput>(filter);
            const value = await this.prisma.managementModel.findFirst({ where });
            return value ? ManagementModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ManagementModelRepositoryProvider: Provider = {
    provide: ManagementModelRepositoryToken,
    useClass: ManagementPrismaRepository,
}