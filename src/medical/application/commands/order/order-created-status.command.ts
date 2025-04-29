import { CommandHandlerAsync } from "@shared/shared/application";
import { OrderRepository } from "../../repository/aggregate.repositories";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";

export type OrderCreatedStatusCommandPayload = {
    orderId: string;
};
export interface OrderCreatedStatusCommand extends CommandHandlerAsync<OrderCreatedStatusCommandPayload, void> { }

export class OrderCreatedStatusCommandImpl implements OrderCreatedStatusCommand {
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