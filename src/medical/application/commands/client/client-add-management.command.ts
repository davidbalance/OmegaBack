import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";
import { Client, ClientProps } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { AddManagementPayload } from "@omega/medical/core/domain/client/payloads/client.payloads";

export type ClientAddManagementCommandPayload = AddManagementPayload & {
    patientDni: string;
}
export class ClientAddManagementCommand implements CommandHandlerAsync<ClientAddManagementCommandPayload, void> {
    constructor(
        private readonly repository: AggregateRepository<ClientProps, Client>
    ) { }

    async handleAsync(value: ClientAddManagementCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.addManagement({
            managementId: value.managementId,
            managementName: value.managementName
        });
        await this.repository.saveAsync(client);
    }
}