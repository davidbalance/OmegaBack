import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { AreaRepository } from "@omega/location/application/repository/model.repositories";
import { AreaModel } from "@omega/location/core/models/area/area.model";
import { AreaModelMapper } from "../../../mapper/location/model/area.model-mapper";
import { AreaModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class AreaPrismaRepository implements AreaRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (Filter<AreaModel> | FilterGroup<AreaModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<AreaModel, Prisma.AreaModelWhereInput>(filter);
            const value = await this.prisma.areaModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<AreaModel>): Promise<AreaModel[]> {
        try {
            const where = PrismaFilterMapper.map<AreaModel, Prisma.AreaModelWhereInput>(filter.filter);
            const values = await this.prisma.areaModel.findMany({
                where,
                orderBy: { ...filter.order }
            });
            return values.map(e => AreaModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<AreaModel> | Filter<AreaModel>)[]): Promise<AreaModel | null> {
        try {
            const where = PrismaFilterMapper.map<AreaModel, Prisma.AreaModelWhereInput>(filter);
            const value = await this.prisma.areaModel.findFirst({ where });
            return value ? AreaModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const AreaModelRepositoryProvider: Provider = {
    provide: AreaModelRepositoryToken,
    useClass: AreaPrismaRepository,
}