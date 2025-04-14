import { Injectable, Inject, Provider, Logger } from "@nestjs/common";
import { TokenRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { TokenModel } from "@omega/auth/core/model/auth/token.model";
import { Prisma } from "@prisma/client";
import { SearchCriteria, FilterGroup, Filter } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { TokenModelMapper } from "../../../mapper/auth/model/token.model-mapper";
import { PrismaService } from "../../../prisma.service";
import { TokenModelRepositoryToken } from "@omega/auth/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class TokenModelPrismaRepository implements TokenRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<TokenModel>): Promise<TokenModel[]> {
        try {
            const where = PrismaFilterMapper.map<TokenModel, Prisma.TokenModelWhereInput>(filter.filter);
            const values = await this.prisma.tokenModel.findMany({ where });
            return values.map(e => TokenModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<TokenModel> | Filter<TokenModel>)[]): Promise<TokenModel | null> {
        try {
            const where = PrismaFilterMapper.map<TokenModel, Prisma.TokenModelWhereInput>(filter);
            const value = await this.prisma.tokenModel.findFirst({ where });
            return value ? TokenModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const TokenModelRepositoryProvider: Provider = {
    provide: TokenModelRepositoryToken,
    useClass: TokenModelPrismaRepository,
}