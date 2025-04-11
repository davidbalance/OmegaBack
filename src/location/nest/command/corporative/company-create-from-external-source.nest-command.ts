import { Injectable, Provider } from "@nestjs/common";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { CompanyCreateFromExternalSourceCommandToken } from "../../inject/command.inject";
import { CompanyCreateFromExternalSourceCommand } from "@omega/location/application/command/corporative/company-create-from-external-source.command";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { CompanyExternalConnectionRepository, CompanyRepository } from "@omega/location/application/repository/model.repositories";

@Injectable()
class CompanyCreateFromExternalSourceNestCommand extends CompanyCreateFromExternalSourceCommand {
    constructor(
        @InjectModelRepository("CompanyExternalConnection") externalConnectionRepository: CompanyExternalConnectionRepository,
        @InjectModelRepository("Company") modelRepository: CompanyRepository,
        @InjectAggregateRepository("Corporative") aggregateRepository: CorporativeRepository
    ) {
        super(
            externalConnectionRepository,
            modelRepository,
            aggregateRepository
        );
    }
}

export const CompanyCreateFromExternalSourceCommandProvider: Provider = {
    provide: CompanyCreateFromExternalSourceCommandToken,
    useClass: CompanyCreateFromExternalSourceNestCommand
}