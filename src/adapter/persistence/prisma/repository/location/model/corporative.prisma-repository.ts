import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { CorporativeRepository } from "@omega/location/application/repository/model.repositories";
import { CorporativeModelMapper } from "../../../mapper/location/model/corporative.model-mapper";
import { CorporativeModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class CorporativePrismaRepository implements CorporativeRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (FilterGroup<CorporativeModel> | Filter<CorporativeModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<CorporativeModel, Prisma.CorporativeModelWhereInput>(filter);
            const value = await this.prisma.corporativeModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<CorporativeModel>): Promise<CorporativeModel[]> {
        try {
            const where = PrismaFilterMapper.map<CorporativeModel, Prisma.CorporativeModelWhereInput>(filter.filter);
            const values = await this.prisma.corporativeModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => CorporativeModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<CorporativeModel> | Filter<CorporativeModel>)[]): Promise<CorporativeModel | null> {
        try {
            const where = PrismaFilterMapper.map<CorporativeModel, Prisma.CorporativeModelWhereInput>(filter);
            const value = await this.prisma.corporativeModel.findFirst({ where });
            return value ? CorporativeModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const CorporativeModelRepositoryProvider: Provider = {
    provide: CorporativeModelRepositoryToken,
    useClass: CorporativePrismaRepository,
}