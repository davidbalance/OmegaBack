import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { OrderRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderModel } from "@omega/medical/core/model/order/order.model";
import { OrderModelMapper } from "../../../mapper/medical/model/order,model-mapper";
import { OrderModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class OrderPrismaRepository implements OrderRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (Filter<OrderModel> | FilterGroup<OrderModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<OrderModel, Prisma.OrderModelWhereInput>(filter);
            const value = await this.prisma.orderModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<OrderModel>): Promise<OrderModel[]> {
        try {
            const where = PrismaFilterMapper.map<OrderModel, Prisma.OrderModelWhereInput>(filter.filter);
            const values = await this.prisma.orderModel.findMany({
                where,
                orderBy: {
                    orderEmissionDate: 'desc',
                    ...filter.order
                },
                take: filter.limit,
                skip: filter.skip
            });
            return values.map(e => OrderModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<OrderModel> | Filter<OrderModel>)[]): Promise<OrderModel | null> {
        try {
            const where = PrismaFilterMapper.map<OrderModel, Prisma.OrderModelWhereInput>(filter);
            const value = await this.prisma.orderModel.findFirst({ where });
            return value ? OrderModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const OrderModelRepositoryProvider: Provider = {
    provide: OrderModelRepositoryToken,
    useClass: OrderPrismaRepository,
}