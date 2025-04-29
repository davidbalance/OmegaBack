import { Injectable, Provider } from "@nestjs/common";
import { ClientEditCommandImpl } from "@omega/medical/application/commands/client/client-edit.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientEditCommandToken } from "../../inject/command.inject";

@Injectable()
class ClientEditNestCommand extends ClientEditCommandImpl {
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