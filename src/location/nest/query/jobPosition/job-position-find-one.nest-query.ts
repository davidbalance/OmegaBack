import { Injectable, Provider } from "@nestjs/common";
import { JobPositionFindOneQueryImpl } from "@omega/location/application/query/job-position/job-position-find-one.query";
import { JobPositionRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { JobPositionFindOneQueryToken } from "../../inject/query.inject";

@Injectable()
class JobPositionFindOneNestQuery extends JobPositionFindOneQueryImpl {
    constructor(
        @InjectModelRepository("JobPosition") repository: JobPositionRepository
    ) {
        super(repository);
    }
}

export const JobPositionFindOneQueryProvider: Provider = {
    provide: JobPositionFindOneQueryToken,
    useClass: JobPositionFindOneNestQuery
}