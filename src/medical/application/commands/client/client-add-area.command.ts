import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";
import { Client, ClientProps } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { AddAreaPayload } from "@omega/medical/core/domain/client/payloads/client.payloads";

export type ClientAddAreaCommandPayload = AddAreaPayload & {
    patientDni: string;
}
export interface ClientAddAreaCommand extends CommandHandlerAsync<ClientAddAreaCommandPayload, void> { }

export class ClientAddAreaCommandImpl implements ClientAddAreaCommand {
    constructor(
        private readonly repository: AggregateRepository<ClientProps, Client>
    ) { }

    async handleAsync(value: ClientAddAreaCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.addArea({
            areaId: value.areaId,
            areaName: value.areaName
        });
        await this.repository.saveAsync(client);
    }
}