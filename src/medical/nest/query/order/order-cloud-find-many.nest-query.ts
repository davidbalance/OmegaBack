import { Injectable, Provider } from "@nestjs/common";
import { OrderCloudFindManyQuery } from "@omega/medical/application/queries/order/order-cloud-find-many.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderCloudFindManyQueryToken } from "../../inject/query.inject";
import { OrderCloudFileRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class OrderCloudFindManyNestQuery extends OrderCloudFindManyQuery {
    constructor(
        @InjectModelRepository("OrderCloudFile") repository: OrderCloudFileRepository
    ) {
        super(repository);
    }
}

export const OrderCloudFindManyQueryProvider: Provider = {
    provide: OrderCloudFindManyQueryToken,
    useClass: OrderCloudFindManyNestQuery
}