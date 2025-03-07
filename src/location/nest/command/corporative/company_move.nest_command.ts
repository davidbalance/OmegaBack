import { Injectable, Provider } from "@nestjs/common";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { CompanyMoveCommandToken } from "../../inject/command.inject";
import { CompanyMoveCommand } from "@omega/location/application/command/corporative/company-move.command";

@Injectable()
class CompanyMoveNestCommand extends CompanyMoveCommand {
    constructor(
        @InjectAggregateRepository("Corporative") repository: CorporativeRepository
    ) {
        super(repository);
    }
}

export const CompanyMoveCommandProvider: Provider = {
    provide: CompanyMoveCommandToken,
    useClass: CompanyMoveNestCommand
}