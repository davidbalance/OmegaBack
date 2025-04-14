import { Injectable, Provider } from "@nestjs/common";
import { ClientDeleteCommand } from "@omega/medical/application/commands/client/client-delete.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientDeleteCommandToken } from "../../inject/command.inject";

@Injectable()
class ClientDeleteNestCommand extends ClientDeleteCommand {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const ClientDeleteCommandProvider: Provider = {
    provide: ClientDeleteCommandToken,
    useClass: ClientDeleteNestCommand
}