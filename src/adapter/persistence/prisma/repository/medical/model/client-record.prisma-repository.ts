import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { ClientRecordRepository } from "@omega/medical/application/repository/model.repositories";
import { PrismaService } from "../../../prisma.service";
import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ClientRecordModelMapper } from "../../../mapper/medical/model/client-record.model-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { ClientRecordModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";

@Injectable()
export class ClientRecordPrismaRepository implements ClientRecordRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<ClientRecordModel>): Promise<ClientRecordModel[]> {
        try {
            const where = PrismaFilterMapper.map<ClientRecordModel, Prisma.ClientRecordModelWhereInput>(filter.filter);
            const values = await this.prisma.clientRecordModel.findMany({
                where,
                orderBy: {
                    recordEmissionDate: 'desc'
                }
            });
            return values.map(e => ClientRecordModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ClientRecordModel> | Filter<ClientRecordModel>)[]): Promise<ClientRecordModel | null> {
        try {
            const where = PrismaFilterMapper.map<ClientRecordModel, Prisma.ClientRecordModelWhereInput>(filter);
            const value = await this.prisma.clientRecordModel.findFirst({ where });
            return value ? ClientRecordModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ClientRecordModelRepositoryProvider: Provider = {
    provide: ClientRecordModelRepositoryToken,
    useClass: ClientRecordPrismaRepository,
}