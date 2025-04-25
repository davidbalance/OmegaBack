import { Injectable, Provider } from "@nestjs/common";
import { CorporativeRemoveCommandImpl } from "@omega/location/application/command/corporative/corporative-remove.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { CorporativeRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class CorporativeRemoveNestCommand extends CorporativeRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("Corporative") repository: CorporativeRepository
    ) {
        super(repository);
    }
}

export const CorporativeRemoveCommandProvider: Provider = {
    provide: CorporativeRemoveCommandToken,
    useClass: CorporativeRemoveNestCommand
}