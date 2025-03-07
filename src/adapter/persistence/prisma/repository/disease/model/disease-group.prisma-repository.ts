import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/model.repositories";
import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { DiseaseGroupModelMapper } from "../../../mapper/disease/model/disease-group.model-mapper";
import { DiseaseGroupModelRepositoryToken } from "@omega/disease/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class DiseaseGroupPrismaRepository implements DiseaseGroupRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (FilterGroup<DiseaseGroupModel> | Filter<DiseaseGroupModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<DiseaseGroupModel, Prisma.DiseaseGroupModelWhereInput>(filter);
            const value = await this.prisma.diseaseGroupModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<DiseaseGroupModel>): Promise<DiseaseGroupModel[]> {
        try {
            const where = PrismaFilterMapper.map<DiseaseGroupModel, Prisma.DiseaseGroupModelWhereInput>(filter.filter);
            const values = await this.prisma.diseaseGroupModel.findMany({
                where,
                orderBy: { ...filter.order },
                take: filter.limit,
                skip: filter.skip
            });
            return values.map(e => DiseaseGroupModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<DiseaseGroupModel> | Filter<DiseaseGroupModel>)[]): Promise<DiseaseGroupModel | null> {
        try {
            const where = PrismaFilterMapper.map<DiseaseGroupModel, Prisma.DiseaseGroupModelWhereInput>(filter);
            const value = await this.prisma.diseaseGroupModel.findFirst({ where });
            return value ? DiseaseGroupModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const DiseaseGroupModelRepositoryProvider: Provider = {
    provide: DiseaseGroupModelRepositoryToken,
    useClass: DiseaseGroupPrismaRepository,
}