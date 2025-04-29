import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { OrderYearModel } from "@omega/medical/core/model/order/order-year.model";

export interface OrderYearFindManyQuery extends QueryHandlerAsync<undefined, OrderYearModel[]> {
    handleAsync(): Promise<OrderYearModel[]>;
}

export class OrderYearFindManyQueryImpl implements OrderYearFindManyQuery {
    constructor(
        private readonly repository: ModelRepository<OrderYearModel>
    ) { }

    async handleAsync(): Promise<OrderYearModel[]> {
        return await this.repository.findManyAsync({ filter: [] });
    }
}