import { Injectable, Provider } from "@nestjs/common";
import { OrderChecklistFindManyQueryImpl } from "@omega/medical/application/queries/order/order-checklist-find-many.query";
import { OrderChecklistRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderChecklistFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class OrderChecklistFindManyNestQuery extends OrderChecklistFindManyQueryImpl {
    constructor(
        @InjectModelRepository("OrderChecklist") repository: OrderChecklistRepository
    ) {
        super(repository);
    }
}

export const OrderChecklistFindManyQueryProvider: Provider = {
    provide: OrderChecklistFindManyQueryToken,
    useClass: OrderChecklistFindManyNestQuery
}