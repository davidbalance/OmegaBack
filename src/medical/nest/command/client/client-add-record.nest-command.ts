import { Injectable, Provider } from "@nestjs/common";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientAddRecordCommandToken } from "../../inject/command.inject";
import { ClientAddRecordCommandImpl } from "@omega/medical/application/commands/client/client-add-record.command";

@Injectable()
class ClientAddRecordNestCommand extends ClientAddRecordCommandImpl {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository,
    ) {
        super(repository);
    }
}

export const ClientAddRecordCommandProvider: Provider = {
    provide: ClientAddRecordCommandToken,
    useClass: ClientAddRecordNestCommand
}