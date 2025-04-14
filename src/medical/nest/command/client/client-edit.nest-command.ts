import { Injectable, Provider } from "@nestjs/common";
import { ClientEditCommand } from "@omega/medical/application/commands/client/client-edit.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientEditCommandToken } from "../../inject/command.inject";

@Injectable()
class ClientEditNestCommand extends ClientEditCommand {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const ClientEditCommandProvider: Provider = {
    provide: ClientEditCommandToken,
    useClass: ClientEditNestCommand
}