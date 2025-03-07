import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { ApiKeyValueRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { ApiKeyValueModel } from "@omega/auth/core/model/auth/api_key_value.model";
import { Prisma } from "@prisma/client";
import { ApiKeyValueModelMapper } from "../../../mapper/auth/model/api_key_value.model-mapper";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { ApiKeyValueModelRepositoryToken } from "@omega/auth/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ApiKeyValueModelPrismaRepository implements ApiKeyValueRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ApiKeyValueModel>): Promise<ApiKeyValueModel[]> {
        try {
            const where = PrismaFilterMapper.map<ApiKeyValueModel, Prisma.ApiKeyValueModelWhereInput>(filter.filter);
            const values = await this.prisma.apiKeyValueModel.findMany({ where });
            return values.map(e => ApiKeyValueModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ApiKeyValueModel> | Filter<ApiKeyValueModel>)[]): Promise<ApiKeyValueModel | null> {
        try {
            const where = PrismaFilterMapper.map<ApiKeyValueModel, Prisma.ApiKeyValueModelWhereInput>(filter);
            const value = await this.prisma.apiKeyValueModel.findFirst({ where });
            return value ? ApiKeyValueModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ApiKeyValueModelRepositoryProvider: Provider = {
    provide: ApiKeyValueModelRepositoryToken,
    useClass: ApiKeyValueModelPrismaRepository,
}