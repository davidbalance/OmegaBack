import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ExamSubtypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamSubtypeExternalConnectionModelRepositoryToken } from "@omega/laboratory/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { ExamSubtypeExternalConnectionModelMapper } from "../../../mapper/laboratory/model/exam-subtype-external-connection.model-mapper";

@Injectable()
export class ExamSubtypeExternalConnectionPrismaRepository implements ExamSubtypeExternalConnectionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ExamSubtypeExternalConnectionModel>): Promise<ExamSubtypeExternalConnectionModel[]> {
        try {
            const where = PrismaFilterMapper.map<ExamSubtypeExternalConnectionModel, Prisma.ExamSubtypeExternalConnectionModelWhereInput>(filter.filter);
            const values = await this.prisma.examSubtypeExternalConnectionModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => ExamSubtypeExternalConnectionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ExamSubtypeExternalConnectionModel> | Filter<ExamSubtypeExternalConnectionModel>)[]): Promise<ExamSubtypeExternalConnectionModel | null> {
        try {
            const where = PrismaFilterMapper.map<ExamSubtypeExternalConnectionModel, Prisma.ExamSubtypeExternalConnectionModelWhereInput>(filter);
            const value = await this.prisma.examSubtypeExternalConnectionModel.findFirst({ where });
            return value ? ExamSubtypeExternalConnectionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ExamSubtypeExternalConnectionModelRepositoryProvider: Provider = {
    provide: ExamSubtypeExternalConnectionModelRepositoryToken,
    useClass: ExamSubtypeExternalConnectionPrismaRepository,
}