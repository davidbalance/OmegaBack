import { Injectable, Provider } from "@nestjs/common";
import { JobPositionEditCommand } from "@omega/location/application/command/job-position/job-position-edit.command";
import { JobPositionRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { JobPositionEditCommandToken } from "../../inject/command.inject";

@Injectable()
class JobPositionEditNestCommand extends JobPositionEditCommand {
    constructor(
        @InjectAggregateRepository("JobPosition") repository: JobPositionRepository
    ) {
        super(repository);
    }
}

export const JobPositionEditCommandProvider: Provider = {
    provide: JobPositionEditCommandToken,
    useClass: JobPositionEditNestCommand
}