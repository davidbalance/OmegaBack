import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { DiseaseGroupOptionRepository } from "@omega/disease/application/repository/model.repositories";
import { DiseaseGroupOptionModel } from "@omega/disease/core/model/disease/disease-group-option.model";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { DiseaseGroupOptionModelMapper } from "../../../mapper/disease/model/disease-group-option.model-mapper";
import { DiseaseGroupOptionModelRepositoryToken } from "@omega/disease/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class DiseaseGroupOptionPrismaRepository implements DiseaseGroupOptionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<DiseaseGroupOptionModel>): Promise<DiseaseGroupOptionModel[]> {
        try {
            const where = PrismaFilterMapper.map<DiseaseGroupOptionModel, Prisma.DiseaseGroupOptionModelWhereInput>(filter.filter);
            const values = await this.prisma.diseaseGroupOptionModel.findMany({ where });
            return values.map(e => DiseaseGroupOptionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<DiseaseGroupOptionModel> | Filter<DiseaseGroupOptionModel>)[]): Promise<DiseaseGroupOptionModel | null> {
        try {
            const where = PrismaFilterMapper.map<DiseaseGroupOptionModel, Prisma.DiseaseGroupOptionModelWhereInput>(filter);
            const value = await this.prisma.diseaseGroupOptionModel.findFirst({ where });
            return value ? DiseaseGroupOptionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const DiseaseGroupOptionModelRepositoryProvider: Provider = {
    provide: DiseaseGroupOptionModelRepositoryToken,
    useClass: DiseaseGroupOptionPrismaRepository,
}