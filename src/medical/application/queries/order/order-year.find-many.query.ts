import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { OrderYearModel } from "@omega/medical/core/model/order/order-year.model";

export class OrderYearFindManyQuery implements QueryHandlerAsync<undefined, OrderYearModel[]> {
    constructor(
        private readonly repository: ModelRepository<OrderYearModel>
    ) { }

    async handleAsync(): Promise<OrderYearModel[]> {
        return await this.repository.findManyAsync({ filter: [] });
    }
}