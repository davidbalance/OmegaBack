import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { OrderYearRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderYearModel } from "@omega/medical/core/model/order/order-year.model";
import { OrderYearModelMapper } from "../../../mapper/medical/model/order-year,model-mapper";
import { OrderYearModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class OrderYearPrismaRepository implements OrderYearRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<OrderYearModel>): Promise<OrderYearModel[]> {
        try {
            const where = PrismaFilterMapper.map<OrderYearModel, Prisma.OrderYearModelWhereInput>(filter.filter);
            const values = await this.prisma.orderYearModel.findMany({ where });
            return values.map(e => OrderYearModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<OrderYearModel> | Filter<OrderYearModel>)[]): Promise<OrderYearModel | null> {
        try {
            const where = PrismaFilterMapper.map<OrderYearModel, Prisma.OrderYearModelWhereInput>(filter);
            const value = await this.prisma.orderYearModel.findFirst({ where });
            return value ? OrderYearModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const OrderYearModelRepositoryProvider: Provider = {
    provide: OrderYearModelRepositoryToken,
    useClass: OrderYearPrismaRepository,
}