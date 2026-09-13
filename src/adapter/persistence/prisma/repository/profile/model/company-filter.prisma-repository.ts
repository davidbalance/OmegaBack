import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { CompanyFilterRepository } from "@omega/profile/application/repository/model.repositories";
import { CompanyFilterModelRepositoryToken } from "@omega/profile/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { CompanyFilterModel } from "@omega/profile/core/model/user/company-filter.model";
import { CompanyFilterModelMapper } from "../../../mapper/profile/model/company-filter.model-mapper";

@Injectable()
export class CompanyFilterPrismaRepository implements CompanyFilterRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<CompanyFilterModel>): Promise<CompanyFilterModel[]> {
        try {
            const where = PrismaFilterMapper.map<CompanyFilterModel, Prisma.CompanyFilterModelWhereInput>(filter.filter);
            const values = await this.prisma.companyFilterModel.findMany({
                where,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit,
                orderBy: filter.order
            });
            return values.map(e => CompanyFilterModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<CompanyFilterModel> | Filter<CompanyFilterModel>)[]): Promise<CompanyFilterModel | null> {
        try {
            const where = PrismaFilterMapper.map<CompanyFilterModel, Prisma.CompanyFilterModelWhereInput>(filter);
            const value = await this.prisma.companyFilterModel.findFirst({ where });
            return value ? CompanyFilterModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const CompanyFilterRepositoryProvider: Provider = {
    provide: CompanyFilterModelRepositoryToken,
    useClass: CompanyFilterPrismaRepository,
}