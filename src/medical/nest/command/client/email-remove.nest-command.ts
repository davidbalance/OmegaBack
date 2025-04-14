import { Injectable, Provider } from "@nestjs/common";
import { EmailRemoveCommand } from "@omega/medical/application/commands/client/email-remove.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { EmailRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class EmailRemoveNestCommand extends EmailRemoveCommand {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const EmailRemoveCommandProvider: Provider = {
    provide: EmailRemoveCommandToken,
    useClass: EmailRemoveNestCommand
}