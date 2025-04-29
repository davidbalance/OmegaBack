import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { UserAttributeRepository } from "@omega/profile/application/repository/model.repositories";
import { UserAttributeModel } from "@omega/profile/core/model/user/user-attribute.model";
import { UserAttributeModelMapper } from "../../../mapper/profile/model/user-attribute.model-mapper";
import { UserAttributeModelRepositoryToken } from "@omega/profile/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class UserAttributePrismaRepository implements UserAttributeRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<UserAttributeModel>): Promise<UserAttributeModel[]> {
        try {
            const where = PrismaFilterMapper.map<UserAttributeModel, Prisma.UserAttributeModelWhereInput>(filter.filter);
            const values = await this.prisma.userAttributeModel.findMany({ where });
            return values.map(e => UserAttributeModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<UserAttributeModel> | Filter<UserAttributeModel>)[]): Promise<UserAttributeModel | null> {
        try {
            const where = PrismaFilterMapper.map<UserAttributeModel, Prisma.UserAttributeModelWhereInput>(filter);
            const value = await this.prisma.userAttributeModel.findFirst({ where });
            return value ? UserAttributeModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const UserAttributeModelRepositoryProvider: Provider = {
    provide: UserAttributeModelRepositoryToken,
    useClass: UserAttributePrismaRepository,
}