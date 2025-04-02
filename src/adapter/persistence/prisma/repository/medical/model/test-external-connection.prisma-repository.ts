import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { TestExternalConnectionModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { TestExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection";
import { TestExternalConnectionModelMapper } from "../../../mapper/medical/model/test-external-connection.model-mapper";

@Injectable()
export class TestExternalConnectionPrismaRepository implements TestExternalConnectionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<TestExternalConnectionModel>): Promise<TestExternalConnectionModel[]> {
        try {
            const where = PrismaFilterMapper.map<TestExternalConnectionModel, Prisma.TestExternalConnectionModelWhereInput>(filter.filter);
            const values = await this.prisma.testExternalConnectionModel.findMany({ where });
            return values.map(e => TestExternalConnectionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<TestExternalConnectionModel> | Filter<TestExternalConnectionModel>)[]): Promise<TestExternalConnectionModel | null> {
        try {
            const where = PrismaFilterMapper.map<TestExternalConnectionModel, Prisma.TestExternalConnectionModelWhereInput>(filter);
            const value = await this.prisma.testExternalConnectionModel.findFirst({ where });
            return value ? TestExternalConnectionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const TestExternalConnectionModelRepositoryProvider: Provider = {
    provide: TestExternalConnectionModelRepositoryToken,
    useClass: TestExternalConnectionPrismaRepository,
}