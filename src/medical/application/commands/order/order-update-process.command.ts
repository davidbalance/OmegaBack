import { OrderRepository } from "../../repository/aggregate.repositories";
import { CommandHandlerAsync } from "@shared/shared/application";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";

export type OrderUpdateProcessCommandPayload = {
    orderId: string;
    process: string;
};
export interface OrderUpdateProcessCommand extends CommandHandlerAsync<OrderUpdateProcessCommandPayload, void> { }

export class OrderUpdateProcessCommandImpl implements OrderUpdateProcessCommand {
    constructor(
        protected readonly repository: OrderRepository
    ) { }

    async handleAsync(value: OrderUpdateProcessCommandPayload): Promise<void> {
        const order = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.orderId }] });
        if (!order) throw new OrderNotFoundError(value.orderId);

        order.changeProcess(value.process);
        await this.repository.saveAsync(order);
    }
}