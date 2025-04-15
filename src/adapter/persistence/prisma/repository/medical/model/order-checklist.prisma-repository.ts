import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { OrderChecklistRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { OrderChecklistModelMapper } from "../../../mapper/medical/model/order-checklist.model-mapper";
import { OrderChecklistModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class OrderChecklistPrismaRepository implements OrderChecklistRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<OrderChecklistModel>): Promise<OrderChecklistModel[]> {
        try {
            const where = PrismaFilterMapper.map<OrderChecklistModel, Prisma.OrderChecklistModelWhereInput>(filter.filter);
            const values = await this.prisma.orderChecklistModel.findMany({ where });
            return values.map(e => OrderChecklistModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<OrderChecklistModel> | Filter<OrderChecklistModel>)[]): Promise<OrderChecklistModel | null> {
        try {
            const where = PrismaFilterMapper.map<OrderChecklistModel, Prisma.OrderChecklistModelWhereInput>(filter);
            const value = await this.prisma.orderChecklistModel.findFirst({ where });
            return value ? OrderChecklistModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const OrderChecklistModelRepositoryProvider: Provider = {
    provide: OrderChecklistModelRepositoryToken,
    useClass: OrderChecklistPrismaRepository,
}