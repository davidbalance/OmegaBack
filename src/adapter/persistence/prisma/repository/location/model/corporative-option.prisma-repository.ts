import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { CorporativeOptionModel } from "@omega/location/core/models/corporative/corporative-option.model";
import { CorporativeOptionRepository } from "@omega/location/application/repository/model.repositories";
import { CorporativeOptionModelMapper } from "../../../mapper/location/model/corporative-option.model-mapper";
import { CorporativeOptionModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class CorporativeOptionPrismaRepository implements CorporativeOptionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<CorporativeOptionModel>): Promise<CorporativeOptionModel[]> {
        try {
            const where = PrismaFilterMapper.map<CorporativeOptionModel, Prisma.CorporativeOptionModelWhereInput>(filter.filter);
            const values = await this.prisma.corporativeOptionModel.findMany({ where });
            return values.map(e => CorporativeOptionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<CorporativeOptionModel> | Filter<CorporativeOptionModel>)[]): Promise<CorporativeOptionModel | null> {
        try {
            const where = PrismaFilterMapper.map<CorporativeOptionModel, Prisma.CorporativeOptionModelWhereInput>(filter);
            const value = await this.prisma.corporativeOptionModel.findFirst({ where });
            return value ? CorporativeOptionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const CorporativeOptionModelRepositoryProvider: Provider = {
    provide: CorporativeOptionModelRepositoryToken,
    useClass: CorporativeOptionPrismaRepository,
}