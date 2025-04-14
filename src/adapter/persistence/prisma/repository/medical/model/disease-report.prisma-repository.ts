import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { DiseaseReportRepository } from "@omega/medical/application/repository/model.repositories";
import { DiseaseReportModel } from "@omega/medical/core/model/test/disease-report.model";
import { DiseaseReportModelMapper } from "../../../mapper/medical/model/disease-report.model-mapper";
import { DiseaseReportModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class DiseaseReportPrismaRepository implements DiseaseReportRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<DiseaseReportModel>): Promise<DiseaseReportModel[]> {
        try {
            const where = PrismaFilterMapper.map<DiseaseReportModel, Prisma.DiseaseReportModelWhereInput>(filter.filter);
            const values = await this.prisma.diseaseReportModel.findMany({ where });
            return values.map(e => DiseaseReportModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<DiseaseReportModel> | Filter<DiseaseReportModel>)[]): Promise<DiseaseReportModel | null> {
        try {
            const where = PrismaFilterMapper.map<DiseaseReportModel, Prisma.DiseaseReportModelWhereInput>(filter);
            const value = await this.prisma.diseaseReportModel.findFirst({ where });
            return value ? DiseaseReportModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const DiseaseReportModelRepositoryProvider: Provider = {
    provide: DiseaseReportModelRepositoryToken,
    useClass: DiseaseReportPrismaRepository,
}