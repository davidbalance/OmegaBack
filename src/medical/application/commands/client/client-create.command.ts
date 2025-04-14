import { CommandHandlerAsync } from "@shared/shared/application";
import { Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientConflictError } from "@omega/medical/core/domain/client/errors/client.errors";
import { CreateClientPayload } from "@omega/medical/core/domain/client/payloads/client.payloads";
import { ClientRepository } from "../../repository/aggregate.repositories";
import { NotificationProvider } from "@shared/shared/providers/notification.provider";

export type ClientCreateCommandPayload = CreateClientPayload & {
    patientEmail: string;
};
export class ClientCreateCommand implements CommandHandlerAsync<ClientCreateCommandPayload, void> {
    constructor(
        private readonly repository: ClientRepository,
        private readonly userNotify: NotificationProvider<CreateClientPayload>
    ) { }

    async handleAsync(value: ClientCreateCommandPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (exists) throw new ClientConflictError(value.patientDni);

        const client = Client.create(value);
        client.addEmail(value.patientEmail);
        await this.repository.saveAsync(client);
        await this.userNotify.emitAsync(value);
    }
}