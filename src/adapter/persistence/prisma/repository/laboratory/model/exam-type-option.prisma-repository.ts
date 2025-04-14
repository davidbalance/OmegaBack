import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ExamTypeOptionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamTypeOptionModel } from "@omega/laboratory/core/model/exam/exam-type-option.model";
import { ExamTypeOptionModelMapper } from "../../../mapper/laboratory/model/exam-type-option.model-mapper";
import { ExamTypeOptionModelRepositoryToken } from "@omega/laboratory/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ExamTypeOptionPrismaRepository implements ExamTypeOptionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ExamTypeOptionModel>): Promise<ExamTypeOptionModel[]> {
        try {
            const where = PrismaFilterMapper.map<ExamTypeOptionModel, Prisma.ExamTypeOptionModelWhereInput>(filter.filter);
            const values = await this.prisma.examTypeOptionModel.findMany({ where });
            return values.map(e => ExamTypeOptionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ExamTypeOptionModel> | Filter<ExamTypeOptionModel>)[]): Promise<ExamTypeOptionModel | null> {
        try {
            const where = PrismaFilterMapper.map<ExamTypeOptionModel, Prisma.ExamTypeOptionModelWhereInput>(filter);
            const value = await this.prisma.examTypeOptionModel.findFirst({ where });
            return value ? ExamTypeOptionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ExamTypeOptionModelRepositoryProvider: Provider = {
    provide: ExamTypeOptionModelRepositoryToken,
    useClass: ExamTypeOptionPrismaRepository,
}