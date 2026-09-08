import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { CorporativeFilterRepository } from "@omega/profile/application/repository/model.repositories";
import { CorporativeFilterModelRepositoryToken } from "@omega/profile/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { CorporativeFilterModel } from "@omega/profile/core/model/user/corporative-filter.model";
import { CorporativeFilterModelMapper } from "../../../mapper/profile/model/corporative-filter.model-mapper";

@Injectable()
export class CorporativeFilterPrismaRepository implements CorporativeFilterRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<CorporativeFilterModel>): Promise<CorporativeFilterModel[]> {
        try {
            const where = PrismaFilterMapper.map<CorporativeFilterModel, Prisma.CorporativeFilterModelWhereInput>(filter.filter);
            const values = await this.prisma.corporativeFilterModel.findMany({
                where,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit,
                orderBy: filter.order
            });
            return values.map(e => CorporativeFilterModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<CorporativeFilterModel> | Filter<CorporativeFilterModel>)[]): Promise<CorporativeFilterModel | null> {
        try {
            const where = PrismaFilterMapper.map<CorporativeFilterModel, Prisma.CorporativeFilterModelWhereInput>(filter);
            const value = await this.prisma.corporativeFilterModel.findFirst({ where });
            return value ? CorporativeFilterModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const CorporativeFilterRepositoryProvider: Provider = {
    provide: CorporativeFilterModelRepositoryToken,
    useClass: CorporativeFilterPrismaRepository,
}