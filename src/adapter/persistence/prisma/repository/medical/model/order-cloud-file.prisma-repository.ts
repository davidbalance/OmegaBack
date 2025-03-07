import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { OrderCloudFileRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderCloudFileModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { OrderCloudFileModel } from "@omega/medical/core/model/order/order-cloud-file.model";
import { OrderCloudFileModelMapper } from "../../../mapper/medical/model/order-cloud-file,model-mapper";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class OrderCloudFilePrismaRepository implements OrderCloudFileRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<OrderCloudFileModel>): Promise<OrderCloudFileModel[]> {
        try {
            const where = PrismaFilterMapper.map<OrderCloudFileModel, Prisma.OrderCloudFileModelWhereInput>(filter.filter);
            const values = await this.prisma.orderCloudFileModel.findMany({ where });
            return values.map(e => OrderCloudFileModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<OrderCloudFileModel> | Filter<OrderCloudFileModel>)[]): Promise<OrderCloudFileModel | null> {
        try {
            const where = PrismaFilterMapper.map<OrderCloudFileModel, Prisma.OrderCloudFileModelWhereInput>(filter);
            const value = await this.prisma.orderCloudFileModel.findFirst({ where });
            return value ? OrderCloudFileModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const OrderCloudFileModelRepositoryProvider: Provider = {
    provide: OrderCloudFileModelRepositoryToken,
    useClass: OrderCloudFilePrismaRepository,
}