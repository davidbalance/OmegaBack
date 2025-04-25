import { CommandHandlerAsync } from "@shared/shared/application";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { OrderRepository } from "../../repository/aggregate.repositories";

export type OrderRemoveCommandPayload = {
    orderId: string;
};
export interface OrderRemoveCommand extends CommandHandlerAsync<OrderRemoveCommandPayload, void> { }

export class OrderRemoveCommandImpl implements OrderRemoveCommand {
    constructor(
        private readonly repository: OrderRepository,
    ) { }

    async handleAsync(value: OrderRemoveCommandPayload): Promise<void> {
        const order = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.orderId }] });
        if (!order) throw new OrderNotFoundError(value.orderId);
        order.remove();
        await this.repository.saveAsync(order);
    }
}