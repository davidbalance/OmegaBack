import { Injectable, Provider } from "@nestjs/common";
import { ClientAddAreaCommand } from "@omega/medical/application/commands/client/client-add-area.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientAddAreaCommandToken } from "../../inject/command.inject";

@Injectable()
class ClientAddAreaNestCommand extends ClientAddAreaCommand {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const ClientAddAreaCommandProvider: Provider = {
    provide: ClientAddAreaCommandToken,
    useClass: ClientAddAreaNestCommand
}