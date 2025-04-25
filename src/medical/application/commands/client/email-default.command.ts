import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";
import { Client, ClientProps } from "@omega/medical/core/domain/client/client.domain";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";

export type EmailDefaultCommandPayload = {
    patientDni: string;
    emailId: string;
}
export interface EmailDefaultCommand extends CommandHandlerAsync<EmailDefaultCommandPayload, void> { }

export class EmailDefaultCommandImpl implements EmailDefaultCommand {
    constructor(
        private readonly repository: AggregateRepository<ClientProps, Client>
    ) { }

    async handleAsync(value: EmailDefaultCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.addDefaultEmail(value.emailId);
        await this.repository.saveAsync(client);
    }
}