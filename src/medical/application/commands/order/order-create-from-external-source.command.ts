import { ClientRepository, OrderExternalConnectionRepository } from "../../repository/model.repositories";
import { OrderRepository } from "../../repository/aggregate.repositories";
import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { OrderExternalKeyConflictError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { Order } from "@omega/medical/core/domain/order/order.domain";
import { CreateOrderPayload } from "@omega/medical/core/domain/order/payloads/order.payloads";
import { OrderCreateCommandPayload } from "./order-create.command";

export type OrderCreateFromExternalSourceCommandPayload = OrderCreateCommandPayload & ExternalKeyCommandPayload;
export interface OrderCreateFromExternalSourceCommand extends CommandHandlerAsync<OrderCreateFromExternalSourceCommandPayload, void> { }

export class OrderCreateFromExternalSourceCommandImpl implements OrderCreateFromExternalSourceCommand {
    constructor(
        private readonly externalConnectionRepository: OrderExternalConnectionRepository,
        private readonly aggregateRepository: OrderRepository,
        private readonly clientRepository: ClientRepository
    ) { }

    async handleAsync(value: OrderCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'orderExternalKey', operator: 'eq', value: value.externalKeyValue },
            { field: 'orderExternalOwner', operator: 'eq', value: value.externalKeyOwner },
        ]);
        if (externalConnection) throw new OrderExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const patient = await this.clientRepository.findOneAsync([{ field: 'patientDni', operator: 'eq', value: value.patientDni }]);
        if (!patient) throw new ClientNotFoundError(value.patientDni);
        const patientId = patient.patientId;

        const order = Order.create({ ...value, patientId });
        order.addExternalKey({ owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(order);
    }
}