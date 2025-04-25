import { Injectable, Provider } from "@nestjs/common";
import { ClientAddJobPositionCommandImpl } from "@omega/medical/application/commands/client/client-add-job-position.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientAddJobPositionCommandToken } from "../../inject/command.inject";

@Injectable()
class ClientAddJobPositionNestCommand extends ClientAddJobPositionCommandImpl {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const ClientAddJobPositionCommandProvider: Provider = {
    provide: ClientAddJobPositionCommandToken,
    useClass: ClientAddJobPositionNestCommand
}