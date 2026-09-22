import { Injectable, Provider } from "@nestjs/common";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientUpdateRecordCommandToken } from "../../inject/command.inject";
import { ClientUpdateRecordCommandImpl } from "@omega/medical/application/commands/client/client-update-record.command";

@Injectable()
class ClientUpdateRecordNestCommand extends ClientUpdateRecordCommandImpl {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository,
    ) {
        super(repository);
    }
}

export const ClientUpdateRecordCommandProvider: Provider = {
    provide: ClientUpdateRecordCommandToken,
    useClass: ClientUpdateRecordNestCommand
}