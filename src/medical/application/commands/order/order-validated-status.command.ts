import { CommandHandlerAsync } from "@shared/shared/application";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { OrderRepository } from "../../repository/aggregate.repositories";

export type OrderValidatedStatusCommandPayload = {
    orderId: string;
};
export class OrderValidatedStatusCommand implements CommandHandlerAsync<OrderValidatedStatusCommandPayload, void> {
    constructor(
        private readonly repository: OrderRepository,
    ) { }

    async handleAsync(value: OrderValidatedStatusCommandPayload): Promise<void> {
        const order = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.orderId }] });
        if (!order) throw new OrderNotFoundError(value.orderId);
        order.changeStatusValidated();
        await this.repository.saveAsync(order);
    }
}