import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { OrderPatientRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderPatientModel } from "@omega/medical/core/model/order/order-patient.model";
import { OrderPatientModelMapper } from "../../../mapper/medical/model/order-patient.model-mapper";
import { OrderPatientModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class OrderPatientPrismaRepository implements OrderPatientRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (FilterGroup<OrderPatientModel> | Filter<OrderPatientModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<OrderPatientModel, Prisma.OrderPatientModelWhereInput>(filter);
            const value = await this.prisma.orderPatientModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<OrderPatientModel>): Promise<OrderPatientModel[]> {
        try {
            const where = PrismaFilterMapper.map<OrderPatientModel, Prisma.OrderPatientModelWhereInput>(filter.filter);
            const values = await this.prisma.orderPatientModel.findMany({
                where,
                orderBy: [
                    { orderEmissionDate: 'desc' },
                    { ...filter.order },
                ],
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => OrderPatientModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<OrderPatientModel> | Filter<OrderPatientModel>)[]): Promise<OrderPatientModel | null> {
        try {
            const where = PrismaFilterMapper.map<OrderPatientModel, Prisma.OrderPatientModelWhereInput>(filter);
            const value = await this.prisma.orderPatientModel.findFirst({ where });
            return value ? OrderPatientModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const OrderPatientModelRepositoryProvider: Provider = {
    provide: OrderPatientModelRepositoryToken,
    useClass: OrderPatientPrismaRepository,
}