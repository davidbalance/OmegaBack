import { Injectable, Provider } from "@nestjs/common";
import { AreaRemoveCommandImpl } from "@omega/location/application/command/area/area-remove.command";
import { AreaRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AreaRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class AreaRemoveNestCommand extends AreaRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("Area") repository: AreaRepository
    ) {
        super(repository);
    }
}

export const AreaRemoveCommandProvider: Provider = {
    provide: AreaRemoveCommandToken,
    useClass: AreaRemoveNestCommand
}