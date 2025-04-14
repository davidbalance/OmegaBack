import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { RepositoryError } from "@shared/shared/domain/error";
import { CorporativeExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";
import { CorporativeExternalConnectionModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { CorporativeExternalConnectionModelMapper } from "../../../mapper/location/model/corporative-external-connection.model-mapper";

@Injectable()
export class CorporativeExternalConnectionPrismaRepository implements CorporativeExternalConnectionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<CorporativeExternalConnectionModel>): Promise<CorporativeExternalConnectionModel[]> {
        try {
            const where = PrismaFilterMapper.map<CorporativeExternalConnectionModel, Prisma.CorporativeExternalConnectionModelWhereInput>(filter.filter);
            const values = await this.prisma.corporativeExternalConnectionModel.findMany({ where });
            return values.map(e => CorporativeExternalConnectionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<CorporativeExternalConnectionModel> | Filter<CorporativeExternalConnectionModel>)[]): Promise<CorporativeExternalConnectionModel | null> {
        try {
            const where = PrismaFilterMapper.map<CorporativeExternalConnectionModel, Prisma.CorporativeExternalConnectionModelWhereInput>(filter);
            const value = await this.prisma.corporativeExternalConnectionModel.findFirst({ where });
            return value ? CorporativeExternalConnectionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const CorporativeExternalConnectionModelRepositoryProvider: Provider = {
    provide: CorporativeExternalConnectionModelRepositoryToken,
    useClass: CorporativeExternalConnectionPrismaRepository,
}