import { Injectable, Provider } from "@nestjs/common";
import { OrderFindOneQuery } from "@omega/medical/application/queries/order/order.find-one.query";
import { OrderRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderFindOneQueryToken } from "../../inject/query.inject";

@Injectable()
class OrderFindOneNestQuery extends OrderFindOneQuery {
    constructor(
        @InjectModelRepository("Order") repository: OrderRepository
    ) {
        super(repository);
    }
}

export const OrderFindOneQueryProvider: Provider = {
    provide: OrderFindOneQueryToken,
    useClass: OrderFindOneNestQuery
}