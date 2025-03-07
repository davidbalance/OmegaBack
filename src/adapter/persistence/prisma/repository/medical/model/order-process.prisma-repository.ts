import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { OrderProcessRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderProcessModel } from "@omega/medical/core/model/order/order-process.model";
import { OrderProcessModelMapper } from "../../../mapper/medical/model/order-process,model-mapper";
import { OrderProcessModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class OrderProcessPrismaRepository implements OrderProcessRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<OrderProcessModel>): Promise<OrderProcessModel[]> {
        try {
            const where = PrismaFilterMapper.map<OrderProcessModel, Prisma.OrderProcessModelWhereInput>(filter.filter);
            const values = await this.prisma.orderProcessModel.findMany({ where });
            return values.map(e => OrderProcessModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<OrderProcessModel> | Filter<OrderProcessModel>)[]): Promise<OrderProcessModel | null> {
        try {
            const where = PrismaFilterMapper.map<OrderProcessModel, Prisma.OrderProcessModelWhereInput>(filter);
            const value = await this.prisma.orderProcessModel.findFirst({ where });
            return value ? OrderProcessModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const OrderProcessModelRepositoryProvider: Provider = {
    provide: OrderProcessModelRepositoryToken,
    useClass: OrderProcessPrismaRepository,
}