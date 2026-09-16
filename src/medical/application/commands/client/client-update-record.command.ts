import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientRepository } from "../../repository/aggregate.repositories";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";

export type ClientUpdateRecordCommandPayload = {
    patientDni: string;
    recordId: string;
    metadata: object;
};
export interface ClientUpdateRecordCommand extends CommandHandlerAsync<ClientUpdateRecordCommandPayload, void> { }

export class ClientUpdateRecordCommandImpl implements ClientUpdateRecordCommand {
    constructor(
        private readonly repository: ClientRepository
    ) { }

    async handleAsync(value: ClientUpdateRecordCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.updateRecordMetadata({ ...value });
        await this.repository.saveAsync(client);
    }
}