import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { UserModel } from "@omega/profile/core/model/user/user.model";
import { UserModelMapper } from "../../../mapper/profile/model/user,model-mapper";
import { UserModelRepositoryToken } from "@omega/profile/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class UserPrismaRepository implements UserRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<UserModel>): Promise<UserModel[]> {
        try {
            const where = PrismaFilterMapper.map<UserModel, Prisma.UserModelWhereInput>(filter.filter);
            const values = await this.prisma.userModel.findMany({
                where,
                skip: filter.skip,
                take: filter.limit,
                orderBy: filter.order
            });
            return values.map(e => UserModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<UserModel> | Filter<UserModel>)[]): Promise<UserModel | null> {
        try {
            const where = PrismaFilterMapper.map<UserModel, Prisma.UserModelWhereInput>(filter);
            const value = await this.prisma.userModel.findFirst({ where });
            return value ? UserModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async countAsync(filter: (FilterGroup<UserModel> | Filter<UserModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<UserModel, Prisma.UserModelWhereInput>(filter);
            const value = await this.prisma.userModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const UserModelRepositoryProvider: Provider = {
    provide: UserModelRepositoryToken,
    useClass: UserPrismaRepository,
}