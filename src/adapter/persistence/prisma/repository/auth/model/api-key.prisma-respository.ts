import { Injectable, Inject, Provider, Logger } from "@nestjs/common";
import { ApiKeyRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { Prisma } from "@prisma/client";
import { SearchCriteria, FilterGroup, Filter } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { ApiKeyModelMapper } from "../../../mapper/auth/model/api-key.model-mapper";
import { PrismaService } from "../../../prisma.service";
import { ApiKeyModel } from "@omega/auth/core/model/auth/api-key.model";
import { ApiKeyModelRepositoryToken } from "@omega/auth/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ApiKeyModelPrismaRepository implements ApiKeyRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ApiKeyModel>): Promise<ApiKeyModel[]> {
        try {
            const where = PrismaFilterMapper.map<ApiKeyModel, Prisma.ApiKeyModelWhereInput>(filter.filter);
            const values = await this.prisma.apiKeyModel.findMany({ where });
            return values.map(e => ApiKeyModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ApiKeyModel> | Filter<ApiKeyModel>)[]): Promise<ApiKeyModel | null> {
        try {
            const where = PrismaFilterMapper.map<ApiKeyModel, Prisma.ApiKeyModelWhereInput>(filter);
            const value = await this.prisma.apiKeyModel.findFirst({ where });
            return value ? ApiKeyModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ApiKeyModelRepositoryProvider: Provider = {
    provide: ApiKeyModelRepositoryToken,
    useClass: ApiKeyModelPrismaRepository,
}