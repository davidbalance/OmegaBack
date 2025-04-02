import { CommandHandlerAsync } from "@shared/shared/application";
import { Order } from "@omega/medical/core/domain/order/order.domain";
import { CreateOrderPayload } from "@omega/medical/core/domain/order/payloads/order.payloads";
import { ClientRepository } from "../../repository/model.repositories";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { OrderRepository } from "../../repository/aggregate.repositories";

export type BaseOrderCreateCommandPayload = Omit<CreateOrderPayload, 'patientId'> & {
    patientDni: string;
};
export abstract class BaseOrderCreateCommand<T extends BaseOrderCreateCommandPayload> implements CommandHandlerAsync<T, void> {
    constructor(
        protected readonly aggregateRepository: OrderRepository,
        private readonly client: ClientRepository
    ) { }

    protected async getPatient(value: T): Promise<string> {
        const patient = await this.client.findOneAsync([{ field: 'patientDni', operator: 'eq', value: value.patientDni }]);
        if (!patient) throw new ClientNotFoundError(value.patientDni);
        return patient.patientId;
    }

    protected createOrder(value: T, patientId: string): Order {
        return Order.create({ ...value, patientId });
    }

    abstract handleAsync(value: T): Promise<void>;
}