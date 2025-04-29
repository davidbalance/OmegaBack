import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { OrderCloudFileModel } from "@omega/medical/core/model/order/order-cloud-file.model";

export type OrderCloudFindManyQueryPayload = {
    orderId: string
}
export interface OrderCloudFindManyQuery extends QueryHandlerAsync<OrderCloudFindManyQueryPayload, OrderCloudFileModel[]> { }

export class OrderCloudFindManyQueryImpl implements OrderCloudFindManyQuery {
    constructor(
        private readonly repository: ModelRepository<OrderCloudFileModel>
    ) { }

    async handleAsync(query: OrderCloudFindManyQueryPayload): Promise<OrderCloudFileModel[]> {
        return this.repository.findManyAsync({ filter: [{ field: 'orderId', operator: 'eq', value: query.orderId }] });
    }
}