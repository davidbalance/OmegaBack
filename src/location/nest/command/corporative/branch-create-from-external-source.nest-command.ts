import { Injectable, Provider } from "@nestjs/common";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { BranchCreateFromExternalSourceCommandToken } from "../../inject/command.inject";
import { BranchCreateFromExternalSourceCommand } from "@omega/location/application/command/corporative/branch-create-from-external-source.command";
import { BranchExternalConnectionRepository, BranchRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";

@Injectable()
class BranchCreateFromExternalSourceNestCommand extends BranchCreateFromExternalSourceCommand {
    constructor(
        @InjectModelRepository('BranchExternalConnection') externalConnectionRepository: BranchExternalConnectionRepository,
        @InjectModelRepository('Branch') modelRepository: BranchRepository,
        @InjectAggregateRepository("Corporative") aggregateRepository: CorporativeRepository
    ) {
        super(
            externalConnectionRepository,
            modelRepository,
            aggregateRepository
        );
    }
}

export const BranchCreateFromExternalSourceCommandProvider: Provider = {
    provide: BranchCreateFromExternalSourceCommandToken,
    useClass: BranchCreateFromExternalSourceNestCommand
}