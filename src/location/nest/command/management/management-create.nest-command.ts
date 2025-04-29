import { Injectable, Provider } from "@nestjs/common";
import { ManagementCreateCommandImpl } from "@omega/location/application/command/management/management-create.command";
import { ManagementRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ManagementCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class ManagementCreateNestCommand extends ManagementCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("Management") repository: ManagementRepository
    ) {
        super(repository);
    }
}

export const ManagementCreateCommandProvider: Provider = {
    provide: ManagementCreateCommandToken,
    useClass: ManagementCreateNestCommand
}