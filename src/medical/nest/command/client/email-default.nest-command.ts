import { Injectable, Provider } from "@nestjs/common";
import { EmailDefaultCommandImpl } from "@omega/medical/application/commands/client/email-default.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { EmailDefaultCommandToken } from "../../inject/command.inject";

@Injectable()
class EmailDefaultNestCommand extends EmailDefaultCommandImpl {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const EmailDefaultCommandProvider: Provider = {
    provide: EmailDefaultCommandToken,
    useClass: EmailDefaultNestCommand
}