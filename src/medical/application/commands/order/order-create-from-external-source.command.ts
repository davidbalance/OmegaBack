import { ClientRepository, OrderExternalConnectionRepository } from "../../repository/model.repositories";
import { OrderRepository } from "../../repository/aggregate.repositories";
import { ExternalKeyCommandPayload } from "@shared/shared/domain/external-key.value-object";
import { OrderExternalKeyConflictError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";
import { BaseOrderCreateCommand, BaseOrderCreateCommandPayload } from "./base.order-create.command";

export type OrderCreateFromExternalSourceCommandPayload = BaseOrderCreateCommandPayload & ExternalKeyCommandPayload;
export class OrderCreateFromExternalSourceCommand extends BaseOrderCreateCommand<OrderCreateFromExternalSourceCommandPayload> {
    constructor(
        private readonly externalConnectionRepository: OrderExternalConnectionRepository,
        aggregateRepository: OrderRepository,
        clientRepository: ClientRepository
    ) {
        super(aggregateRepository, clientRepository);
    }

    async handleAsync(value: OrderCreateFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'orderExternalKey', operator: 'eq', value: value.externalKeyValue },
            { field: 'orderExternalOwner', operator: 'eq', value: value.externalKeyOwner },
        ]);
        if (externalConnection) throw new OrderExternalKeyConflictError(value.externalKeyOwner, value.externalKeyValue);

        const patientId = await this.getPatient(value);
        const order = this.createOrder(value, patientId);
        order.addExternalKey({ owner: value.externalKeyOwner, value: value.externalKeyValue });
        await this.aggregateRepository.saveAsync(order);
    }
}