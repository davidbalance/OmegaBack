import { Injectable, Provider } from "@nestjs/common";
import { BranchRemoveCommandImpl } from "@omega/location/application/command/corporative/branch-remove.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { BranchRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class BranchRemoveNestCommand extends BranchRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("Corporative") repository: CorporativeRepository
    ) {
        super(repository);
    }
}

export const BranchRemoveCommandProvider: Provider = {
    provide: BranchRemoveCommandToken,
    useClass: BranchRemoveNestCommand
}