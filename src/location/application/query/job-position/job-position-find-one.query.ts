import { JobPositionNotFoundError } from "@omega/location/core/domain/job-position/errors/job-position.errors";
import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { JobPositionRepository } from "../../repository/model.repositories";

export type JobPositionFindOneQueryPayload = {
    jobPositionId: string;
}
export interface JobPositionFindOneQuery extends QueryHandlerAsync<JobPositionFindOneQueryPayload, JobPositionModel> { }

export class JobPositionFindOneQueryImpl implements JobPositionFindOneQuery {
    constructor(
        private readonly repository: JobPositionRepository
    ) { }

    async handleAsync(query: JobPositionFindOneQueryPayload): Promise<JobPositionModel> {
        const value = await this.repository.findOneAsync([{ field: 'jobPositionId', operator: 'eq', value: query.jobPositionId }]);
        if (!value) throw new JobPositionNotFoundError(query.jobPositionId);
        return value;
    }
}