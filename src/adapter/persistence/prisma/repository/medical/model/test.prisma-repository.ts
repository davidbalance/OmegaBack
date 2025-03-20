import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { TestRepository } from "@omega/medical/application/repository/model.repositories";
import { TestModel } from "@omega/medical/core/model/test/test.model";
import { TestModelMapper } from "../../../mapper/medical/model/test.model-mapper";
import { TestModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class TestPrismaRepository implements TestRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<TestModel>): Promise<TestModel[]> {
        try {
            const where = PrismaFilterMapper.map<TestModel, Prisma.TestModelWhereInput>(filter.filter);
            const values = await this.prisma.testModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => TestModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<TestModel> | Filter<TestModel>)[]): Promise<TestModel | null> {
        try {
            const where = PrismaFilterMapper.map<TestModel, Prisma.TestModelWhereInput>(filter);
            const value = await this.prisma.testModel.findFirst({ where });
            return value ? TestModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const TestModelRepositoryProvider: Provider = {
    provide: TestModelRepositoryToken,
    useClass: TestPrismaRepository,
}