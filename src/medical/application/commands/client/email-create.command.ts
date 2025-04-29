import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { ClientRepository } from "../../repository/aggregate.repositories";

export type EmailCreateCommandPayload = {
    patientDni: string;
    email: string;
}
export interface EmailCreateCommand extends CommandHandlerAsync<EmailCreateCommandPayload, void> { }

export class EmailCreateCommandImpl implements EmailCreateCommand {
    constructor(
        private readonly repository: ClientRepository
    ) { }

    async handleAsync(value: EmailCreateCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        client.addEmail(value.email);
        await this.repository.saveAsync(client);
    }
}