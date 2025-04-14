import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { TestReportRepository } from "@omega/medical/application/repository/model.repositories";
import { TestReportModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { TestReportModelMapper } from "../../../mapper/medical/model/test-report.model-mapper";
import { TestReportModel } from "@omega/medical/core/model/test/test-report.model";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class TestReportPrismaRepository implements TestReportRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<TestReportModel>): Promise<TestReportModel[]> {
        try {
            const where = PrismaFilterMapper.map<TestReportModel, Prisma.TestReportModelWhereInput>(filter.filter);
            const values = await this.prisma.testReportModel.findMany({ where });
            return values.map(e => TestReportModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<TestReportModel> | Filter<TestReportModel>)[]): Promise<TestReportModel | null> {
        try {
            const where = PrismaFilterMapper.map<TestReportModel, Prisma.TestReportModelWhereInput>(filter);
            const value = await this.prisma.testReportModel.findFirst({ where });
            return value ? TestReportModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const TestReportModelRepositoryProvider: Provider = {
    provide: TestReportModelRepositoryToken,
    useClass: TestReportPrismaRepository,
}