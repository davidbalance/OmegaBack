import { Injectable, Inject, Provider, Logger } from "@nestjs/common";
import { AuthResourceRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { AuthResourceModel } from "@omega/auth/core/model/auth/auth_resource.model";
import { Prisma } from "@prisma/client";
import { SearchCriteria, FilterGroup, Filter } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { AuthResourceModelMapper } from "../../../mapper/auth/model/auth_resource.model-mapper";
import { PrismaService } from "../../../prisma.service";
import { AuthResourceModelRepositoryToken } from "@omega/auth/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class AuthResourceModelPrismaRepository implements AuthResourceRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<AuthResourceModel>): Promise<AuthResourceModel[]> {
        try {
            const where = PrismaFilterMapper.map<AuthResourceModel, Prisma.AuthResourceModelWhereInput>(filter.filter);
            const values = await this.prisma.authResourceModel.findMany({
                where,
                orderBy: [{
                    resourceOrder: 'asc',
                }, {
                    resourceLabel: 'asc'
                }]
            });
            return values.map(e => AuthResourceModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<AuthResourceModel> | Filter<AuthResourceModel>)[]): Promise<AuthResourceModel | null> {
        try {
            const where = PrismaFilterMapper.map<AuthResourceModel, Prisma.AuthResourceModelWhereInput>(filter);
            const value = await this.prisma.authResourceModel.findFirst({ where });
            return value ? AuthResourceModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const AuthResourceModelRepositoryProvider: Provider = {
    provide: AuthResourceModelRepositoryToken,
    useClass: AuthResourceModelPrismaRepository,
}