import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ExamRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { ExamModelMapper } from "../../../mapper/laboratory/model/exam.model-mapper";
import { ExamModelRepositoryToken } from "@omega/laboratory/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ExamPrismaRepository implements ExamRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ExamModel>): Promise<ExamModel[]> {
        try {
            const where = PrismaFilterMapper.map<ExamModel, Prisma.ExamModelWhereInput>(filter.filter);
            const values = await this.prisma.examModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => ExamModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ExamModel> | Filter<ExamModel>)[]): Promise<ExamModel | null> {
        try {
            const where = PrismaFilterMapper.map<ExamModel, Prisma.ExamModelWhereInput>(filter);
            const value = await this.prisma.examModel.findFirst({ where });
            return value ? ExamModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ExamModelRepositoryProvider: Provider = {
    provide: ExamModelRepositoryToken,
    useClass: ExamPrismaRepository,
}