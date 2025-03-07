import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeModelMapper } from "../../../mapper/laboratory/model/exam-type.model-mapper";
import { ExamTypeModelRepositoryToken } from "@omega/laboratory/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ExamTypePrismaRepository implements ExamTypeRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (FilterGroup<ExamTypeModel> | Filter<ExamTypeModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<ExamTypeModel, Prisma.ExamTypeModelWhereInput>(filter);
            const value = await this.prisma.examTypeModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<ExamTypeModel>): Promise<ExamTypeModel[]> {
        try {
            const where = PrismaFilterMapper.map<ExamTypeModel, Prisma.ExamTypeModelWhereInput>(filter.filter);
            const values = await this.prisma.examTypeModel.findMany({
                where,
                orderBy: filter.order,
                skip: filter.skip,
                take: filter.limit
            });
            return values.map(e => ExamTypeModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ExamTypeModel> | Filter<ExamTypeModel>)[]): Promise<ExamTypeModel | null> {
        try {
            const where = PrismaFilterMapper.map<ExamTypeModel, Prisma.ExamTypeModelWhereInput>(filter);
            const value = await this.prisma.examTypeModel.findFirst({ where });
            return value ? ExamTypeModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ExamTypeModelRepositoryProvider: Provider = {
    provide: ExamTypeModelRepositoryToken,
    useClass: ExamTypePrismaRepository,
}