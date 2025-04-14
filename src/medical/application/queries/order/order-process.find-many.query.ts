import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { OrderProcessModel } from "@omega/medical/core/model/order/order-process.model";

export class OrderProcessFindManyQuery implements QueryHandlerAsync<undefined, OrderProcessModel[]> {
    constructor(
        private readonly repository: ModelRepository<OrderProcessModel>
    ) { }

    async handleAsync(): Promise<OrderProcessModel[]> {
        return this.repository.findManyAsync({ filter: [] });
    }

}