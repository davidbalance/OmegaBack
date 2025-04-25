import { Injectable, Provider } from "@nestjs/common";
import { JobPositionCreateCommandImpl } from "@omega/location/application/command/job-position/job-position-create.command";
import { JobPositionRepository } from "@omega/location/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { JobPositionCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class JobPositionCreateNestCommand extends JobPositionCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("JobPosition") repository: JobPositionRepository
    ) {
        super(repository);
    }
}

export const JobPositionCreateCommandProvider: Provider = {
    provide: JobPositionCreateCommandToken,
    useClass: JobPositionCreateNestCommand
}