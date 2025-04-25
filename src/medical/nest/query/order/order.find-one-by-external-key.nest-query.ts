import { Injectable, Provider } from "@nestjs/common";
import { OrderExternalConnectionRepository, OrderRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderFindOneByExternalKeyQueryToken } from "../../inject/query.inject";
import { OrderFindOneByExternalKeyQueryImpl } from "@omega/medical/application/queries/order/order.find-one-by-external-key.query";

@Injectable()
class OrderFindOneByExternalKeyNestQuery extends OrderFindOneByExternalKeyQueryImpl {
    constructor(
        @InjectModelRepository("OrderExternalConnection") externalConnectionRepository: OrderExternalConnectionRepository,
        @InjectModelRepository("Order") modelRepository: OrderRepository,
    ) {
        super(externalConnectionRepository, modelRepository);
    }
}

export const OrderFindOneByExternalKeyQueryProvider: Provider = {
    provide: OrderFindOneByExternalKeyQueryToken,
    useClass: OrderFindOneByExternalKeyNestQuery
}