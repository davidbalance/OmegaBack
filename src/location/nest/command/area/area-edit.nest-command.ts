import { Injectable, Provider } from "@nestjs/common";
import { AreaEditCommandImpl } from "@omega/location/application/command/area/area-edit.command";
import { AreaRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { AreaEditCommandToken } from "../../inject/command.inject";

@Injectable()
class AreaEditNestCommand extends AreaEditCommandImpl {
    constructor(
        @InjectAggregateRepository("Area") repository: AreaRepository
    ) {
        super(repository);
    }
}

export const AreaEditCommandProvider: Provider = {
    provide: AreaEditCommandToken,
    useClass: AreaEditNestCommand
}