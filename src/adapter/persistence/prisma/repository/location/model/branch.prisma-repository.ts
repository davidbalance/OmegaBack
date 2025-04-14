import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { BranchRepository } from "@omega/location/application/repository/model.repositories";
import { BranchModel } from "@omega/location/core/models/corporative/branch.model";
import { BranchModelMapper } from "../../../mapper/location/model/branch.model-mapper";
import { BranchModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class BranchPrismaRepository implements BranchRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<BranchModel>): Promise<BranchModel[]> {
        try {
            const where = PrismaFilterMapper.map<BranchModel, Prisma.BranchModelWhereInput>(filter.filter);
            const values = await this.prisma.branchModel.findMany({
                where,
                orderBy: filter.order
            });
            return values.map(e => BranchModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<BranchModel> | Filter<BranchModel>)[]): Promise<BranchModel | null> {
        try {
            const where = PrismaFilterMapper.map<BranchModel, Prisma.BranchModelWhereInput>(filter);
            const value = await this.prisma.branchModel.findFirst({ where });
            return value ? BranchModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const BranchModelRepositoryProvider: Provider = {
    provide: BranchModelRepositoryToken,
    useClass: BranchPrismaRepository,
}