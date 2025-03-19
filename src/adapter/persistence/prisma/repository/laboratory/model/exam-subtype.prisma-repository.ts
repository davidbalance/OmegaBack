import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamSubtypeModelMapper } from "../../../mapper/laboratory/model/exam-subtype.model-mapper";
import { ExamSubtypeModelRepositoryToken } from "@omega/laboratory/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ExamSubtypePrismaRepository implements ExamSubtypeRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (FilterGroup<ExamSubtypeModel> | Filter<ExamSubtypeModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<ExamSubtypeModel, Prisma.ExamSubtypeModelWhereInput>(filter);
            const value = await this.prisma.examSubtypeModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<ExamSubtypeModel>): Promise<ExamSubtypeModel[]> {
        try {
            const where = PrismaFilterMapper.map<ExamSubtypeModel, Prisma.ExamSubtypeModelWhereInput>(filter.filter);
            const values = await this.prisma.examSubtypeModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => ExamSubtypeModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ExamSubtypeModel> | Filter<ExamSubtypeModel>)[]): Promise<ExamSubtypeModel | null> {
        try {
            const where = PrismaFilterMapper.map<ExamSubtypeModel, Prisma.ExamSubtypeModelWhereInput>(filter);
            const value = await this.prisma.examSubtypeModel.findFirst({ where });
            return value ? ExamSubtypeModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ExamSubtypeModelRepositoryProvider: Provider = {
    provide: ExamSubtypeModelRepositoryToken,
    useClass: ExamSubtypePrismaRepository,
}