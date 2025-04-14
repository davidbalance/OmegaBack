import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";
import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";
import { ResultFilepathModelMapper } from "../../../mapper/medical/model/result-filepath.model-mapper";
import { ResultFilepathModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ResultFilepathPrismaRepository implements ResultFilepathRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ResultFilepathModel>): Promise<ResultFilepathModel[]> {
        try {
            const where = PrismaFilterMapper.map<ResultFilepathModel, Prisma.ResultFilepathModelWhereInput>(filter.filter);
            const values = await this.prisma.resultFilepathModel.findMany({ where });
            return values.map(e => ResultFilepathModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ResultFilepathModel> | Filter<ResultFilepathModel>)[]): Promise<ResultFilepathModel | null> {
        try {
            const where = PrismaFilterMapper.map<ResultFilepathModel, Prisma.ResultFilepathModelWhereInput>(filter);
            const value = await this.prisma.resultFilepathModel.findFirst({ where });
            return value ? ResultFilepathModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ResultFilepathModelRepositoryProvider: Provider = {
    provide: ResultFilepathModelRepositoryToken,
    useClass: ResultFilepathPrismaRepository,
}