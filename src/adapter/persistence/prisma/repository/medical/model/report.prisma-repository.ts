import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ReportModelMapper } from "../../../mapper/medical/model/report.model-mapper";
import { ReportModel } from "@omega/medical/core/model/test/report.model";
import { ReportRepository } from "@omega/medical/application/repository/model.repositories";
import { ReportModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ReportPrismaRepository implements ReportRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ReportModel>): Promise<ReportModel[]> {
        try {
            const where = PrismaFilterMapper.map<ReportModel, Prisma.ReportModelWhereInput>(filter.filter);
            const values = await this.prisma.reportModel.findMany({ where });
            return values.map(e => ReportModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ReportModel> | Filter<ReportModel>)[]): Promise<ReportModel | null> {
        try {
            const where = PrismaFilterMapper.map<ReportModel, Prisma.ReportModelWhereInput>(filter);
            const value = await this.prisma.reportModel.findFirst({ where });
            return value ? ReportModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ReportModelRepositoryProvider: Provider = {
    provide: ReportModelRepositoryToken,
    useClass: ReportPrismaRepository,
}