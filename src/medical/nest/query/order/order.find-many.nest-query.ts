import { Injectable, Provider } from "@nestjs/common";
import { OrderFindManyQuery } from "@omega/medical/application/queries/order/order.find-many.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderFindManyQueryToken } from "../../inject/query.inject";
import { OrderRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class OrderFindManyNestQuery extends OrderFindManyQuery {
    constructor(
        @InjectModelRepository("Order") repository: OrderRepository
    ) {
        super(repository);
    }
}

export const OrderFindManyQueryProvider: Provider = {
    provide: OrderFindManyQueryToken,
    useClass: OrderFindManyNestQuery
}