import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFileResultRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { TestFileResultModel } from "@omega/medical/core/model/test/test_file_result.model";
import { SearchCriteria, FilterGroup, Filter } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { TestFileResultModelMapper } from "../../../mapper/medical/model/test_file_result.model_mapper";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class TestFileResultPrismaRepository implements TestFileResultRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (FilterGroup<TestFileResultModel> | Filter<TestFileResultModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<TestFileResultModel, Prisma.TestFileResultModelWhereInput>(filter);
            const value = await this.prisma.testFileResultModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<TestFileResultModel>): Promise<TestFileResultModel[]> {
        try {
            const where = PrismaFilterMapper.map<TestFileResultModel, Prisma.TestFileResultModelWhereInput>(filter.filter);
            const values = await this.prisma.testFileResultModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => TestFileResultModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<TestFileResultModel> | Filter<TestFileResultModel>)[]): Promise<TestFileResultModel | null> {
        try {
            const where = PrismaFilterMapper.map<TestFileResultModel, Prisma.TestFileResultModelWhereInput>(filter);
            const value = await this.prisma.testFileResultModel.findFirst({ where });
            return value ? TestFileResultModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const TestFileResultRepositoryProvider: Provider = {
    provide: TestFileResultRepositoryToken,
    useClass: TestFileResultPrismaRepository,
}