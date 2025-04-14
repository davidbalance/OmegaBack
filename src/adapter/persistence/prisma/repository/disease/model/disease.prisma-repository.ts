import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { DiseaseRepository } from "@omega/disease/application/repository/model.repositories";
import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";
import { DiseaseModelMapper } from "../../../mapper/disease/model/disease.model-mapper";
import { DiseaseModelRepositoryToken } from "@omega/disease/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class DiseasePrismaRepository implements DiseaseRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (FilterGroup<DiseaseModel> | Filter<DiseaseModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<DiseaseModel, Prisma.DiseaseModelWhereInput>(filter);
            const value = await this.prisma.diseaseModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<DiseaseModel>): Promise<DiseaseModel[]> {
        try {
            const where = PrismaFilterMapper.map<DiseaseModel, Prisma.DiseaseModelWhereInput>(filter.filter);
            const values = await this.prisma.diseaseModel.findMany({
                where,
                orderBy: { ...filter.order },
                take: filter.limit,
                skip: filter.skip
            });
            return values.map(e => DiseaseModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<DiseaseModel> | Filter<DiseaseModel>)[]): Promise<DiseaseModel | null> {
        try {
            const where = PrismaFilterMapper.map<DiseaseModel, Prisma.DiseaseModelWhereInput>(filter);
            const value = await this.prisma.diseaseModel.findFirst({ where });
            return value ? DiseaseModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const DiseaseModelRepositoryProvider: Provider = {
    provide: DiseaseModelRepositoryToken,
    useClass: DiseasePrismaRepository,
}