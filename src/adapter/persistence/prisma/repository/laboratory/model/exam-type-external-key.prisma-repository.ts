import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ExamTypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamTypeExternalConnectionModelRepositoryToken } from "@omega/laboratory/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeExternalConnectionModelMapper } from "../../../mapper/laboratory/model/exam-type-external-connection.model-mapper";

@Injectable()
export class ExamTypeExternalConnectionPrismaRepository implements ExamTypeExternalConnectionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ExamTypeExternalConnectionModel>): Promise<ExamTypeExternalConnectionModel[]> {
        try {
            const where = PrismaFilterMapper.map<ExamTypeExternalConnectionModel, Prisma.ExamTypeExternalConnectionModelWhereInput>(filter.filter);
            const values = await this.prisma.examTypeExternalConnectionModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => ExamTypeExternalConnectionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ExamTypeExternalConnectionModel> | Filter<ExamTypeExternalConnectionModel>)[]): Promise<ExamTypeExternalConnectionModel | null> {
        try {
            const where = PrismaFilterMapper.map<ExamTypeExternalConnectionModel, Prisma.ExamTypeExternalConnectionModelWhereInput>(filter);
            const value = await this.prisma.examTypeExternalConnectionModel.findFirst({ where });
            return value ? ExamTypeExternalConnectionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ExamTypeExternalConnectionModelRepositoryProvider: Provider = {
    provide: ExamTypeExternalConnectionModelRepositoryToken,
    useClass: ExamTypeExternalConnectionPrismaRepository,
}