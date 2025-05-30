import { Injectable, Provider } from "@nestjs/common";
import { EmailCreateCommandImpl } from "@omega/medical/application/commands/client/email-create.command";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { EmailCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class EmailCreateNestCommand extends EmailCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const EmailCreateCommandProvider: Provider = {
    provide: EmailCreateCommandToken,
    useClass: EmailCreateNestCommand
}