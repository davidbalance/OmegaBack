import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientRepository } from "../../repository/aggregate.repositories";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";

export type ClientAddRecordCommandPayload = {
    patientDni: string;
    name: string
    metadata: object;
};

export interface ClientAddRecordCommand extends CommandHandlerAsync<ClientAddRecordCommandPayload, void> { }


export class ClientAddRecordCommandImpl implements ClientAddRecordCommand {
    constructor(
        private readonly repository: ClientRepository
    ) { }

    async handleAsync(value: ClientAddRecordCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.addRecord({ ...value });
        await this.repository.saveAsync(client);
    }
}