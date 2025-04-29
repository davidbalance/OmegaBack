import { AreaRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AreaCreateCommandImpl } from "@omega/location/application/command/area/area-create.command";
import { AreaCreateCommandToken } from "../../inject/command.inject";
import { Injectable, Provider } from "@nestjs/common";

@Injectable()
class AreaCreateNestCommand extends AreaCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("Area") repository: AreaRepository
    ) {
        super(repository);
    }
}

export const AreaCreateCommandProvider: Provider = {
    provide: AreaCreateCommandToken,
    useClass: AreaCreateNestCommand
}