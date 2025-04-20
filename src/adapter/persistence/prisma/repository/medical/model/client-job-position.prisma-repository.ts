import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ClientJobPositionRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientJobPositionModel } from "@omega/medical/core/model/client/client-job-position.model";
import { ClientJobPositionModelMapper } from "../../../mapper/medical/model/client-job-position.model-mapper";
import { ClientJobPositionModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ClientJobPositionPrismaRepository implements ClientJobPositionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ClientJobPositionModel>): Promise<ClientJobPositionModel[]> {
        try {
            const where = PrismaFilterMapper.map<ClientJobPositionModel, Prisma.ClientJobPositionModelWhereInput>(filter.filter);
            const values = await this.prisma.clientJobPositionModel.findMany({ where });
            return values.map(e => ClientJobPositionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ClientJobPositionModel> | Filter<ClientJobPositionModel>)[]): Promise<ClientJobPositionModel | null> {
        try {
            const where = PrismaFilterMapper.map<ClientJobPositionModel, Prisma.ClientJobPositionModelWhereInput>(filter);
            const value = await this.prisma.clientJobPositionModel.findFirst({ where });
            return value ? ClientJobPositionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ClientJobPositionModelRepositoryProvider: Provider = {
    provide: ClientJobPositionModelRepositoryToken,
    useClass: ClientJobPositionPrismaRepository,
}