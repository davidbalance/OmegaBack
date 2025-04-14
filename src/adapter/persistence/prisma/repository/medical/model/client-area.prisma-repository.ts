import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ClientAreaRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientAreaModel } from "@omega/medical/core/model/client/client-area.model";
import { ClientAreaModelMapper } from "../../../mapper/medical/model/client_area.model_mapper";
import { ClientAreaModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ClientAreaPrismaRepository implements ClientAreaRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ClientAreaModel>): Promise<ClientAreaModel[]> {
        try {
            const where = PrismaFilterMapper.map<ClientAreaModel, Prisma.ClientAreaModelWhereInput>(filter.filter);
            const values = await this.prisma.clientAreaModel.findMany({ where });
            return values.map(e => ClientAreaModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ClientAreaModel> | Filter<ClientAreaModel>)[]): Promise<ClientAreaModel | null> {
        try {
            const where = PrismaFilterMapper.map<ClientAreaModel, Prisma.ClientAreaModelWhereInput>(filter);
            const value = await this.prisma.clientAreaModel.findFirst({ where });
            return value ? ClientAreaModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ClientAreaModelRepositoryProvider: Provider = {
    provide: ClientAreaModelRepositoryToken,
    useClass: ClientAreaPrismaRepository,
}