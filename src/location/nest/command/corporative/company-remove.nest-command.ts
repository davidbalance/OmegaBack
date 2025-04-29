import { Injectable, Provider } from "@nestjs/common";
import { CompanyRemoveCommandImpl } from "@omega/location/application/command/corporative/company-remove.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { CompanyRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class CompanyRemoveNestCommand extends CompanyRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("Corporative") repository: CorporativeRepository
    ) {
        super(repository);
    }
}

export const CompanyRemoveCommandProvider: Provider = {
    provide: CompanyRemoveCommandToken,
    useClass: CompanyRemoveNestCommand
}