import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ClientManagementRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientManagementModel } from "@omega/medical/core/model/client/client-management.model";
import { ClientManagementModelMapper } from "../../../mapper/medical/model/client-management.model-mapper";
import { ClientManagementModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ClientManagementPrismaRepository implements ClientManagementRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ClientManagementModel>): Promise<ClientManagementModel[]> {
        try {
            const where = PrismaFilterMapper.map<ClientManagementModel, Prisma.ClientManagementModelWhereInput>(filter.filter);
            const values = await this.prisma.clientManagementModel.findMany({ where });
            return values.map(e => ClientManagementModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ClientManagementModel> | Filter<ClientManagementModel>)[]): Promise<ClientManagementModel | null> {
        try {
            const where = PrismaFilterMapper.map<ClientManagementModel, Prisma.ClientManagementModelWhereInput>(filter);
            const value = await this.prisma.clientManagementModel.findFirst({ where });
            return value ? ClientManagementModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ClientManagementModelRepositoryProvider: Provider = {
    provide: ClientManagementModelRepositoryToken,
    useClass: ClientManagementPrismaRepository,
}