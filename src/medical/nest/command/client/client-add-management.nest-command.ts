import { Injectable, Provider } from "@nestjs/common";
import { ClientAddManagementCommand } from "@omega/medical/application/commands/client/client-add-management.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientAddManagementCommandToken } from "../../inject/command.inject";

@Injectable()
class ClientAddManagementNestCommand extends ClientAddManagementCommand {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const ClientAddManagementCommandProvider: Provider = {
    provide: ClientAddManagementCommandToken,
    useClass: ClientAddManagementNestCommand
}