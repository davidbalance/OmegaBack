import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { OrderModel } from "@omega/medical/core/model/order/order.model";

export type OrderFindOneQueryPayload = {
    orderId: string
}
export class OrderFindOneQuery implements QueryHandlerAsync<OrderFindOneQueryPayload, OrderModel> {
    constructor(
        private readonly repository: ModelRepository<OrderModel>
    ) { }

    async handleAsync(query: OrderFindOneQueryPayload): Promise<OrderModel> {
        const value = await this.repository.findOneAsync([{ field: 'orderId', operator: 'eq', value: query.orderId }]);
        if (!value) throw new OrderNotFoundError(query.orderId);
        return value;
    }

}