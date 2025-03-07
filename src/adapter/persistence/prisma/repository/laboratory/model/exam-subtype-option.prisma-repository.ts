import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ExamSubtypeOptionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamSubtypeOptionModel } from "@omega/laboratory/core/model/exam/exam-subtype-option.model";
import { ExamSubtypeOptionModelMapper } from "../../../mapper/laboratory/model/exam-subtype-option.model-mapper";
import { ExamSubtypeOptionModelRepositoryToken } from "@omega/laboratory/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ExamSubtypeOptionPrismaRepository implements ExamSubtypeOptionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ExamSubtypeOptionModel>): Promise<ExamSubtypeOptionModel[]> {
        try {
            const where = PrismaFilterMapper.map<ExamSubtypeOptionModel, Prisma.ExamSubtypeOptionModelWhereInput>(filter.filter);
            const values = await this.prisma.examSubtypeOptionModel.findMany({ where });
            return values.map(e => ExamSubtypeOptionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ExamSubtypeOptionModel> | Filter<ExamSubtypeOptionModel>)[]): Promise<ExamSubtypeOptionModel | null> {
        try {
            const where = PrismaFilterMapper.map<ExamSubtypeOptionModel, Prisma.ExamSubtypeOptionModelWhereInput>(filter);
            const value = await this.prisma.examSubtypeOptionModel.findFirst({ where });
            return value ? ExamSubtypeOptionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ExamSubtypeOptionModelRepositoryProvider: Provider = {
    provide: ExamSubtypeOptionModelRepositoryToken,
    useClass: ExamSubtypeOptionPrismaRepository,
}