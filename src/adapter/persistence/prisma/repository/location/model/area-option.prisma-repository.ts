import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { AreaOptionRepository } from "@omega/location/application/repository/model.repositories";
import { AreaOptionModel } from "@omega/location/core/models/area/area-option.model";
import { AreaOptionModelMapper } from "../../../mapper/location/model/area-option.model-mapper";
import { AreaOptionModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class AreaOptionPrismaRepository implements AreaOptionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<AreaOptionModel>): Promise<AreaOptionModel[]> {
        try {
            const where = PrismaFilterMapper.map<AreaOptionModel, Prisma.AreaOptionModelWhereInput>(filter.filter);
            const values = await this.prisma.areaOptionModel.findMany({ where });
            return values.map(e => AreaOptionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<AreaOptionModel> | Filter<AreaOptionModel>)[]): Promise<AreaOptionModel | null> {
        try {
            const where = PrismaFilterMapper.map<AreaOptionModel, Prisma.AreaOptionModelWhereInput>(filter);
            const value = await this.prisma.areaOptionModel.findFirst({ where });
            return value ? AreaOptionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const AreaOptionModelRepositoryProvider: Provider = {
    provide: AreaOptionModelRepositoryToken,
    useClass: AreaOptionPrismaRepository,
}