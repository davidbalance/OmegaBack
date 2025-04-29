import { Injectable, Provider } from "@nestjs/common";
import { JobPositionFindManyQueryImpl } from "@omega/location/application/query/job-position/job-position-find-many.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { JobPositionRepository } from "@omega/location/application/repository/model.repositories";
import { JobPositionFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class JobPositionFindManyNestQuery extends JobPositionFindManyQueryImpl {
    constructor(
        @InjectModelRepository("JobPosition") repository: JobPositionRepository
    ) {
        super(repository);
    }
}

export const JobPositionFindManyQueryProvider: Provider = {
    provide: JobPositionFindManyQueryToken,
    useClass: JobPositionFindManyNestQuery
}