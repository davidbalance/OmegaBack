import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { CompanyOptionModel } from "@omega/location/core/models/corporative/company-option.model";
import { CompanyOptionRepository } from "@omega/location/application/repository/model.repositories";
import { CompanyOptionModelMapper } from "../../../mapper/location/model/company-option.model-mapper";
import { CompanyOptionModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class CompanyOptionPrismaRepository implements CompanyOptionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<CompanyOptionModel>): Promise<CompanyOptionModel[]> {
        try {
            const where = PrismaFilterMapper.map<CompanyOptionModel, Prisma.CompanyOptionModelWhereInput>(filter.filter);
            const values = await this.prisma.companyOptionModel.findMany({ where });
            return values.map(e => CompanyOptionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<CompanyOptionModel> | Filter<CompanyOptionModel>)[]): Promise<CompanyOptionModel | null> {
        try {
            const where = PrismaFilterMapper.map<CompanyOptionModel, Prisma.CompanyOptionModelWhereInput>(filter);
            const value = await this.prisma.companyOptionModel.findFirst({ where });
            return value ? CompanyOptionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const CompanyOptionModelRepositoryProvider: Provider = {
    provide: CompanyOptionModelRepositoryToken,
    useClass: CompanyOptionPrismaRepository,
}