import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { TestInnerRepository } from "@omega/medical/application/repository/model.repositories";
import { TestInnerModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { TestInnerModel } from "@omega/medical/core/model/test/test-inner.model";
import { TestInnerModelMapper } from "../../../mapper/medical/model/test-inner.model-mapper";

@Injectable()
export class TestInnerPrismaRepository implements TestInnerRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<TestInnerModel>): Promise<TestInnerModel[]> {
        try {
            const where = PrismaFilterMapper.map<TestInnerModel, Prisma.TestInnerModelWhereInput>(filter.filter);
            const values = await this.prisma.testInnerModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => TestInnerModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<TestInnerModel> | Filter<TestInnerModel>)[]): Promise<TestInnerModel | null> {
        try {
            const where = PrismaFilterMapper.map<TestInnerModel, Prisma.TestInnerModelWhereInput>(filter);
            const value = await this.prisma.testInnerModel.findFirst({ where });
            return value ? TestInnerModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const TestInnerModelRepositoryProvider: Provider = {
    provide: TestInnerModelRepositoryToken,
    useClass: TestInnerPrismaRepository,
}