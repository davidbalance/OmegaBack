import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { RepositoryError } from "@shared/shared/domain/error";
import { BranchExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";
import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";
import { BranchExternalConnectionModelMapper } from "../../../mapper/location/model/branch-external-connection.model-mapper";
import { BranchExternalConnectionModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";

@Injectable()
export class BranchExternalConnectionPrismaRepository implements BranchExternalConnectionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<BranchExternalConnectionModel>): Promise<BranchExternalConnectionModel[]> {
        try {
            const where = PrismaFilterMapper.map<BranchExternalConnectionModel, Prisma.BranchExternalConnectionModelWhereInput>(filter.filter);
            const values = await this.prisma.branchExternalConnectionModel.findMany({ where });
            return values.map(e => BranchExternalConnectionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<BranchExternalConnectionModel> | Filter<BranchExternalConnectionModel>)[]): Promise<BranchExternalConnectionModel | null> {
        try {
            const where = PrismaFilterMapper.map<BranchExternalConnectionModel, Prisma.BranchExternalConnectionModelWhereInput>(filter);
            const value = await this.prisma.branchExternalConnectionModel.findFirst({ where });
            return value ? BranchExternalConnectionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const BranchExternalConnectionModelRepositoryProvider: Provider = {
    provide: BranchExternalConnectionModelRepositoryToken,
    useClass: BranchExternalConnectionPrismaRepository,
}