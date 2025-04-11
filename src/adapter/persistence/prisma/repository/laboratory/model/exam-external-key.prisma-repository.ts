import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ExamExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamExternalConnectionModelRepositoryToken } from "@omega/laboratory/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { ExamExternalConnectionModelMapper } from "../../../mapper/laboratory/model/exam-external-connection.model-mapper";

@Injectable()
export class ExamExternalConnectionPrismaRepository implements ExamExternalConnectionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ExamExternalConnectionModel>): Promise<ExamExternalConnectionModel[]> {
        try {
            const where = PrismaFilterMapper.map<ExamExternalConnectionModel, Prisma.ExamExternalConnectionModelWhereInput>(filter.filter);
            const values = await this.prisma.examExternalConnectionModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => ExamExternalConnectionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ExamExternalConnectionModel> | Filter<ExamExternalConnectionModel>)[]): Promise<ExamExternalConnectionModel | null> {
        try {
            const where = PrismaFilterMapper.map<ExamExternalConnectionModel, Prisma.ExamExternalConnectionModelWhereInput>(filter);
            const value = await this.prisma.examExternalConnectionModel.findFirst({ where });
            return value ? ExamExternalConnectionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ExamExternalConnectionModelRepositoryProvider: Provider = {
    provide: ExamExternalConnectionModelRepositoryToken,
    useClass: ExamExternalConnectionPrismaRepository,
}