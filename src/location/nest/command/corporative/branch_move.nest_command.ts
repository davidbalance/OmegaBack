import { Injectable, Provider } from "@nestjs/common";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { BranchMoveCommandToken } from "../../inject/command.inject";
import { BranchMoveCommandImpl } from "@omega/location/application/command/corporative/branch-move.command";

@Injectable()
class BranchMoveNestCommand extends BranchMoveCommandImpl {
    constructor(
        @InjectAggregateRepository("Corporative") repository: CorporativeRepository
    ) {
        super(repository);
    }
}

export const BranchMoveCommandProvider: Provider = {
    provide: BranchMoveCommandToken,
    useClass: BranchMoveNestCommand
}