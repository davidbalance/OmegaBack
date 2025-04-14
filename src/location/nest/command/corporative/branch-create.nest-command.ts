import { Injectable, Provider } from "@nestjs/common";
import { BranchCreateCommand } from "@omega/location/application/command/corporative/branch-create.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { BranchCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class BranchCreateNestCommand extends BranchCreateCommand {
    constructor(
        @InjectAggregateRepository("Corporative") repository: CorporativeRepository
    ) {
        super(repository);
    }
}

export const BranchCreateCommandProvider: Provider = {
    provide: BranchCreateCommandToken,
    useClass: BranchCreateNestCommand
}