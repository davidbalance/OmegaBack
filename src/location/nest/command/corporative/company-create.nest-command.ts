import { Injectable, Provider } from "@nestjs/common";
import { CompanyCreateCommand } from "@omega/location/application/command/corporative/company-create.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { CompanyCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class CompanyCreateNestCommand extends CompanyCreateCommand {
    constructor(
        @InjectAggregateRepository("Corporative") repository: CorporativeRepository
    ) {
        super(repository);
    }
}

export const CompanyCreateCommandProvider: Provider = {
    provide: CompanyCreateCommandToken,
    useClass: CompanyCreateNestCommand
}