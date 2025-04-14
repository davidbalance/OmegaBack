import { Injectable, Provider } from "@nestjs/common";
import { ManagementEditCommand } from "@omega/location/application/command/management/management-edit.command";
import { ManagementRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ManagementEditCommandToken } from "../../inject/command.inject";

@Injectable()
class ManagementEditNestCommand extends ManagementEditCommand {
    constructor(
        @InjectAggregateRepository("Management") repository: ManagementRepository
    ) {
        super(repository);
    }
}

export const ManagementEditCommandProvider: Provider = {
    provide: ManagementEditCommandToken,
    useClass: ManagementEditNestCommand
}