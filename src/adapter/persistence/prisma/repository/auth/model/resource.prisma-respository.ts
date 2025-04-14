import { Injectable, Inject, Provider, Logger } from "@nestjs/common";
import { ResourceRepository } from "@omega/auth/application/repository/resource/model.repositories";
import { ResourceModel } from "@omega/auth/core/model/resource/resource.model";
import { Prisma } from "@prisma/client";
import { SearchCriteria, FilterGroup, Filter } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { ResourceModelMapper } from "../../../mapper/auth/model/resource.model-mapper";
import { PrismaService } from "../../../prisma.service";
import { ResourceModelRepositoryToken } from "@omega/auth/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ResourceModelPrismaRepository implements ResourceRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ResourceModel>): Promise<ResourceModel[]> {
        try {
            const where = PrismaFilterMapper.map<ResourceModel, Prisma.ResourceModelWhereInput>(filter.filter);
            const values = await this.prisma.resourceModel.findMany({
                where,
                orderBy: [
                    { resourceOrder: 'asc' },
                    { resourceLabel: 'asc' },
                ]
            });
            return values.map(e => ResourceModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ResourceModel> | Filter<ResourceModel>)[]): Promise<ResourceModel | null> {
        try {
            const where = PrismaFilterMapper.map<ResourceModel, Prisma.ResourceModelWhereInput>(filter);
            const value = await this.prisma.resourceModel.findFirst({ where });
            return value ? ResourceModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ResourceModelRepositoryProvider: Provider = {
    provide: ResourceModelRepositoryToken,
    useClass: ResourceModelPrismaRepository,
}