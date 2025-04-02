import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { OrderExternalConnectionModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { OrderExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { OrderExternalConnectionModelMapper } from "../../../mapper/medical/model/order-external-connection.model-mapper";

@Injectable()
export class OrderExternalConnectionPrismaRepository implements OrderExternalConnectionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<OrderExternalConnectionModel>): Promise<OrderExternalConnectionModel[]> {
        try {
            const where = PrismaFilterMapper.map<OrderExternalConnectionModel, Prisma.OrderExternalConnectionModelWhereInput>(filter.filter);
            const values = await this.prisma.orderExternalConnectionModel.findMany({ where });
            return values.map(e => OrderExternalConnectionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<OrderExternalConnectionModel> | Filter<OrderExternalConnectionModel>)[]): Promise<OrderExternalConnectionModel | null> {
        try {
            const where = PrismaFilterMapper.map<OrderExternalConnectionModel, Prisma.OrderExternalConnectionModelWhereInput>(filter);
            const value = await this.prisma.orderExternalConnectionModel.findFirst({ where });
            return value ? OrderExternalConnectionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const OrderExternalConnectionModelRepositoryProvider: Provider = {
    provide: OrderExternalConnectionModelRepositoryToken,
    useClass: OrderExternalConnectionPrismaRepository,
}