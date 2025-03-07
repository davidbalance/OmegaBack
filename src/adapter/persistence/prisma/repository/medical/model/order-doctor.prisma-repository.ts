import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { OrderDoctorRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderDoctorModel } from "@omega/medical/core/model/order/order-doctor.model";
import { OrderDoctorModelMapper } from "../../../mapper/medical/model/order-doctor,model-mapper";
import { OrderDoctorModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class OrderDoctorPrismaRepository implements OrderDoctorRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (Filter<OrderDoctorModel> | FilterGroup<OrderDoctorModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<OrderDoctorModel, Prisma.OrderDoctorModelWhereInput>(filter);
            const value = await this.prisma.orderDoctorModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<OrderDoctorModel>): Promise<OrderDoctorModel[]> {
        try {
            const where = PrismaFilterMapper.map<OrderDoctorModel, Prisma.OrderDoctorModelWhereInput>(filter.filter);
            const values = await this.prisma.orderDoctorModel.findMany({
                where,
                orderBy: {
                    orderEmissionDate: 'desc',
                    ...filter.order
                },
                skip: filter.skip,
                take: filter.limit
            });
            return values.map(e => OrderDoctorModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<OrderDoctorModel> | Filter<OrderDoctorModel>)[]): Promise<OrderDoctorModel | null> {
        try {
            const where = PrismaFilterMapper.map<OrderDoctorModel, Prisma.OrderDoctorModelWhereInput>(filter);
            const value = await this.prisma.orderDoctorModel.findFirst({ where });
            return value ? OrderDoctorModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const OrderDoctorModelRepositoryProvider: Provider = {
    provide: OrderDoctorModelRepositoryToken,
    useClass: OrderDoctorPrismaRepository,
}