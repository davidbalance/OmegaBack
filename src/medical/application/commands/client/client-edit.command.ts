import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";
import { ClientProps, Client } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { EditClientPayload } from "@omega/medical/core/domain/client/payloads/client.payloads";

export type ClientEditCommandPayload = EditClientPayload & {
    patientDni: string;
};
export class ClientEditCommand implements CommandHandlerAsync<ClientEditCommandPayload, void> {
    constructor(
        private readonly repository: AggregateRepository<ClientProps, Client>
    ) { }

    async handleAsync(value: ClientEditCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.edit(value);
        await this.repository.saveAsync(client);
    }
}