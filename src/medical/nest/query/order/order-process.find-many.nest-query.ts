import { Injectable, Provider } from "@nestjs/common";
import { OrderProcessFindManyQuery } from "@omega/medical/application/queries/order/order-process.find-many.query";
import { OrderProcessRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderProcessFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class OrderProcessFindManyNestQuery extends OrderProcessFindManyQuery {
    constructor(
        @InjectModelRepository("OrderProcess") repository: OrderProcessRepository
    ) {
        super(repository);
    }
}

export const OrderProcessFindManyQueryProvider: Provider = {
    provide: OrderProcessFindManyQueryToken,
    useClass: OrderProcessFindManyNestQuery
}