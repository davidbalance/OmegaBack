import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { CompanyRepository } from "@omega/location/application/repository/model.repositories";
import { CompanyModelMapper } from "../../../mapper/location/model/company.model-mapper";
import { CompanyModel } from "@omega/location/core/models/corporative/company.model";
import { CompanyModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class CompanyPrismaRepository implements CompanyRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (FilterGroup<CompanyModel> | Filter<CompanyModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<CompanyModel, Prisma.CompanyModelWhereInput>(filter);
            const value = await this.prisma.companyModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<CompanyModel>): Promise<CompanyModel[]> {
        try {
            const where = PrismaFilterMapper.map<CompanyModel, Prisma.CompanyModelWhereInput>(filter.filter);
            const values = await this.prisma.companyModel.findMany({
                where,
                orderBy: filter.order,
                skip: filter.skip,
                take: filter.limit
            });
            return values.map(e => CompanyModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<CompanyModel> | Filter<CompanyModel>)[]): Promise<CompanyModel | null> {
        try {
            const where = PrismaFilterMapper.map<CompanyModel, Prisma.CompanyModelWhereInput>(filter);
            const value = await this.prisma.companyModel.findFirst({ where });
            return value ? CompanyModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const CompanyModelRepositoryProvider: Provider = {
    provide: CompanyModelRepositoryToken,
    useClass: CompanyPrismaRepository,
}