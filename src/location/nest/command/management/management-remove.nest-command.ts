import { Injectable, Provider } from "@nestjs/common";
import { ManagementRemoveCommandImpl } from "@omega/location/application/command/management/management-remove.command";
import { ManagementRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ManagementRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class ManagementRemoveNestCommand extends ManagementRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("Management") repository: ManagementRepository
    ) {
        super(repository);
    }
}

export const ManagementRemoveCommandProvider: Provider = {
    provide: ManagementRemoveCommandToken,
    useClass: ManagementRemoveNestCommand
}