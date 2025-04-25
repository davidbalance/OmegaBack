import { Injectable, Provider } from "@nestjs/common";
import { ManagementEditCommandImpl } from "@omega/location/application/command/management/management-edit.command";
import { ManagementRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ManagementEditCommandToken } from "../../inject/command.inject";

@Injectable()
class ManagementEditNestCommand extends ManagementEditCommandImpl {
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