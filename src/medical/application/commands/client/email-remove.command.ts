import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientRepository } from "../../repository/aggregate.repositories";

export type EmailRemoveCommandPayload = {
    patientDni: string;
    emailId: string;
}
export interface EmailRemoveCommand extends CommandHandlerAsync<EmailRemoveCommandPayload, void> { }

export class EmailRemoveCommandImpl implements EmailRemoveCommand {
    constructor(
        private readonly repository: ClientRepository
    ) { }

    async handleAsync(value: EmailRemoveCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.removeEmail(value.emailId);
        await this.repository.saveAsync(client);
    }
}