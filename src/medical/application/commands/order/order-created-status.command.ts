import { CommandHandlerAsync } from "@shared/shared/application";
import { OrderRepository } from "../../repository/aggregate.repositories";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";

export type OrderCreatedStatusCommandPayload = {
    orderId: string;
};
export class OrderCreatedStatusCommand implements CommandHandlerAsync<OrderCreatedStatusCommandPayload, void> {
    constructor(
        private readonly repository: OrderRepository,
    ) { }

    async handleAsync(value: OrderCreatedStatusCommandPayload): Promise<void> {
        const order = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.orderId }] });
        if (!order) throw new OrderNotFoundError(value.orderId);
        order.changeStatusCreated();
        await this.repository.saveAsync(order);
    }
}