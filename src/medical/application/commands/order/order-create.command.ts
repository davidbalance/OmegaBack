import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientRepository } from "../../repository/model.repositories";
import { OrderRepository } from "../../repository/aggregate.repositories";
import { CreateOrderPayload } from "@omega/medical/core/domain/order/payloads/order.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { Order } from "@omega/medical/core/domain/order/order.domain";

export type OrderCreateCommandPayload = Omit<CreateOrderPayload, 'patientId'> & {
    patientDni: string;
};
export interface OrderCreateCommand extends CommandHandlerAsync<OrderCreateCommandPayload, void> { }

export class OrderCreateCommandImpl implements OrderCreateCommand {
    constructor(
        protected readonly aggregateRepository: OrderRepository,
        private readonly clientRepository: ClientRepository
    ) { }

    async handleAsync(value: OrderCreateCommandPayload): Promise<void> {
        const patient = await this.clientRepository.findOneAsync([{ field: 'patientDni', operator: 'eq', value: value.patientDni }]);
        if (!patient) throw new ClientNotFoundError(value.patientDni);
        const patientId = patient.patientId;

        const order = Order.create({ ...value, patientId });
        await this.aggregateRepository.saveAsync(order);
    }
}