import { BaseOrderCreateCommand, BaseOrderCreateCommandPayload } from "./base.order-create.command";

export type OrderCreateCommandPayload = BaseOrderCreateCommandPayload;
export class OrderCreateCommand extends BaseOrderCreateCommand<OrderCreateCommandPayload> {

    async handleAsync(value: BaseOrderCreateCommandPayload): Promise<void> {
        const patientId = await this.getPatient(value);
        const order = this.createOrder(value, patientId);
        await this.aggregateRepository.saveAsync(order);
    }
}