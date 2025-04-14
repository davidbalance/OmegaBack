import { Injectable, Inject, Provider, Logger } from "@nestjs/common";
import { AuthRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { AuthModel } from "@omega/auth/core/model/auth/auth.model";
import { Prisma } from "@prisma/client";
import { SearchCriteria, FilterGroup, Filter } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { AuthModelMapper } from "../../../mapper/auth/model/auth.model-mapper";
import { PrismaService } from "../../../prisma.service";
import { AuthModelRepositoryToken } from "@omega/auth/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class AuthModelPrismaRepository implements AuthRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<AuthModel>): Promise<AuthModel[]> {
        try {
            const where = PrismaFilterMapper.map<AuthModel, Prisma.AuthModelWhereInput>(filter.filter);
            const values = await this.prisma.authModel.findMany({ where });
            return values.map(e => AuthModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<AuthModel> | Filter<AuthModel>)[]): Promise<AuthModel | null> {
        try {
            const where = PrismaFilterMapper.map<AuthModel, Prisma.AuthModelWhereInput>(filter);
            const value = await this.prisma.authModel.findFirst({ where });
            return value ? AuthModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const AuthModelRepositoryProvider: Provider = {
    provide: AuthModelRepositoryToken,
    useClass: AuthModelPrismaRepository,
}