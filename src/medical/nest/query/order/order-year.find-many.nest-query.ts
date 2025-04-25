import { Injectable, Provider } from "@nestjs/common";
import { OrderYearFindManyQueryImpl } from "@omega/medical/application/queries/order/order-year.find-many.query";
import { OrderYearRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderYearFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class OrderYearFindManyNestQuery extends OrderYearFindManyQueryImpl {
    constructor(
        @InjectModelRepository("OrderYear") repository: OrderYearRepository
    ) {
        super(repository);
    }
}

export const OrderYearFindManyQueryProvider: Provider = {
    provide: OrderYearFindManyQueryToken,
    useClass: OrderYearFindManyNestQuery
}