import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ClientEmailRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientEmailModel } from "@omega/medical/core/model/client/client-email.model";
import { ClientEmailModelMapper } from "../../../mapper/medical/model/client-email.model-mapper";
import { ClientEmailModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ClientEmailPrismaRepository implements ClientEmailRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ClientEmailModel>): Promise<ClientEmailModel[]> {
        try {
            const where = PrismaFilterMapper.map<ClientEmailModel, Prisma.ClientEmailModelWhereInput>(filter.filter);
            const values = await this.prisma.clientEmailModel.findMany({ where });
            return values.map(e => ClientEmailModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ClientEmailModel> | Filter<ClientEmailModel>)[]): Promise<ClientEmailModel | null> {
        try {
            const where = PrismaFilterMapper.map<ClientEmailModel, Prisma.ClientEmailModelWhereInput>(filter);
            const value = await this.prisma.clientEmailModel.findFirst({ where });
            return value ? ClientEmailModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ClientEmailModelRepositoryProvider: Provider = {
    provide: ClientEmailModelRepositoryToken,
    useClass: ClientEmailPrismaRepository,
}