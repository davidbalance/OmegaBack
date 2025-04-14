import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { RepositoryError } from "@shared/shared/domain/error";
import { CompanyExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";
import { CompanyExternalConnectionModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";
import { CompanyExternalConnectionModelMapper } from "../../../mapper/location/model/company-external-connection.model-mapper";

@Injectable()
export class CompanyExternalConnectionPrismaRepository implements CompanyExternalConnectionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<CompanyExternalConnectionModel>): Promise<CompanyExternalConnectionModel[]> {
        try {
            const where = PrismaFilterMapper.map<CompanyExternalConnectionModel, Prisma.CompanyExternalConnectionModelWhereInput>(filter.filter);
            const values = await this.prisma.companyExternalConnectionModel.findMany({ where });
            return values.map(e => CompanyExternalConnectionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<CompanyExternalConnectionModel> | Filter<CompanyExternalConnectionModel>)[]): Promise<CompanyExternalConnectionModel | null> {
        try {
            const where = PrismaFilterMapper.map<CompanyExternalConnectionModel, Prisma.CompanyExternalConnectionModelWhereInput>(filter);
            const value = await this.prisma.companyExternalConnectionModel.findFirst({ where });
            return value ? CompanyExternalConnectionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const CompanyExternalConnectionModelRepositoryProvider: Provider = {
    provide: CompanyExternalConnectionModelRepositoryToken,
    useClass: CompanyExternalConnectionPrismaRepository,
}