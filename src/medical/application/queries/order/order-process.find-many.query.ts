import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { OrderProcessModel } from "@omega/medical/core/model/order/order-process.model";

export interface OrderProcessFindManyQuery extends QueryHandlerAsync<undefined, OrderProcessModel[]> {
    handleAsync(): Promise<OrderProcessModel[]>;
}

export class OrderProcessFindManyQueryImpl implements OrderProcessFindManyQuery {
    constructor(
        private readonly repository: ModelRepository<OrderProcessModel>
    ) { }

    async handleAsync(): Promise<OrderProcessModel[]> {
        return this.repository.findManyAsync({ filter: [] });
    }
}