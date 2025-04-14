import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";
import { Client, ClientProps } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";

export type EmailRemoveCommandPayload = {
    patientDni: string;
    emailId: string;
}
export class EmailRemoveCommand implements CommandHandlerAsync<EmailRemoveCommandPayload, void> {
    constructor(
        private readonly repository: AggregateRepository<ClientProps, Client>
    ) { }

    async handleAsync(value: EmailRemoveCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.removeEmail(value.emailId);
        await this.repository.saveAsync(client);
    }
}