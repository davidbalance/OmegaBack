import { Injectable, Provider } from "@nestjs/common";
import { JobPositionRemoveCommandImpl } from "@omega/location/application/command/job-position/job-position-remove.command";
import { JobPositionRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { JobPositionRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class JobPositionRemoveNestCommand extends JobPositionRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("JobPosition") repository: JobPositionRepository
    ) {
        super(repository);
    }
}

export const JobPositionRemoveCommandProvider: Provider = {
    provide: JobPositionRemoveCommandToken,
    useClass: JobPositionRemoveNestCommand
}