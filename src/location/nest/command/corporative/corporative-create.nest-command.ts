import { Injectable, Provider } from "@nestjs/common";
import { CorporativeCreateCommandImpl } from "@omega/location/application/command/corporative/corporative-create.command";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { CorporativeCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class CorporativeCreateNestCommand extends CorporativeCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("Corporative") repository: CorporativeRepository
    ) {
        super(repository);
    }
}

export const CorporativeCreateCommandProvider: Provider = {
    provide: CorporativeCreateCommandToken,
    useClass: CorporativeCreateNestCommand
}