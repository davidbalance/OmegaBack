import { CommandHandlerAsync } from "@shared/shared/application";
import { Order } from "@omega/medical/core/domain/order/order.domain";
import { CreateOrderPayload } from "@omega/medical/core/domain/order/payloads/order.payloads";
import { ClientRepository } from "../../repository/model.repositories";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { OrderRepository } from "../../repository/aggregate.repositories";

export type OrderCreateCommandPayload = Omit<CreateOrderPayload, 'patientId'> & {
    patientDni: string;
};
export class OrderCreateCommand implements CommandHandlerAsync<OrderCreateCommandPayload, void> {
    constructor(
        private readonly repository: OrderRepository,
        private readonly client: ClientRepository
    ) { }

    async handleAsync(value: OrderCreateCommandPayload): Promise<void> {
        const patient = await this.client.findOneAsync([{ field: 'patientDni', operator: 'eq', value: value.patientDni }]);
        if (!patient) throw new ClientNotFoundError(value.patientDni);
        const order = Order.create({ ...value, patientId: patient.patientId });
        await this.repository.saveAsync(order);
    }
}