import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";

export type OrderChecklistFindManyQueryPayload = {
    orderId: string;
}
export class OrderChecklistFindManyQuery implements QueryHandlerAsync<OrderChecklistFindManyQueryPayload, OrderChecklistModel[]> {
    constructor(
        private readonly repository: ModelRepository<OrderChecklistModel>
    ) { }

    async handleAsync(query: OrderChecklistFindManyQueryPayload): Promise<OrderChecklistModel[]> {
        return this.repository.findManyAsync({ filter: [{ field: 'orderId', operator: 'eq', value: query.orderId }] });
    }
}