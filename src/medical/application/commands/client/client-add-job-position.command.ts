import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { AddJobPositionPayload } from "@omega/medical/core/domain/client/payloads/client.payloads";
import { ClientRepository } from "../../repository/aggregate.repositories";

export type ClientAddJobPositionCommandPayload = AddJobPositionPayload & {
    patientDni: string;
}
export interface ClientAddJobPositionCommand extends CommandHandlerAsync<ClientAddJobPositionCommandPayload, void> { }

export class ClientAddJobPositionCommandImpl implements ClientAddJobPositionCommand {
    constructor(
        private readonly repository: ClientRepository
    ) { }

    async handleAsync(value: ClientAddJobPositionCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.addJobPosition({ jobPositionName: value.jobPositionName });
        await this.repository.saveAsync(client);
    }
}