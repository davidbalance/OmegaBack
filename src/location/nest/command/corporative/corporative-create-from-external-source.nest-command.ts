import { Injectable, Provider } from "@nestjs/common";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { CorporativeCreateFromExternalSourceCommandToken } from "../../inject/command.inject";
import { CorporativeCreateFromExternalSourceCommand } from "@omega/location/application/command/corporative/corporative-create-from-external-source.command";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { CorporativeExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";

@Injectable()
class CorporativeCreateFromExternalSourceNestCommand extends CorporativeCreateFromExternalSourceCommand {
    constructor(
        @InjectModelRepository('CorporativeExternalConnection') externalConnectionRepository: CorporativeExternalConnectionRepository,
        @InjectAggregateRepository("Corporative") aggregateRepository: CorporativeRepository
    ) {
        super(externalConnectionRepository, aggregateRepository);
    }
}

export const CorporativeCreateFromExternalSourceCommandProvider: Provider = {
    provide: CorporativeCreateFromExternalSourceCommandToken,
    useClass: CorporativeCreateFromExternalSourceNestCommand
}