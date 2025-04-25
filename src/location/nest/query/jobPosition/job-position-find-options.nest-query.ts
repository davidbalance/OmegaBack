import { Injectable, Provider } from "@nestjs/common";
import { JobPositionFindOptionsQueryImpl } from "@omega/location/application/query/job-position/job-position-find-options.query";
import { JobPositionOptionRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { JobPositionFindOptionsQueryToken } from "../../inject/query.inject";

@Injectable()
class JobPositionFindOptionsNestQuery extends JobPositionFindOptionsQueryImpl {
    constructor(
        @InjectModelRepository("JobPositionOption") repository: JobPositionOptionRepository
    ) {
        super(repository);
    }
}

export const JobPositionFindOptionsQueryProvider: Provider = {
    provide: JobPositionFindOptionsQueryToken,
    useClass: JobPositionFindOptionsNestQuery
}