import { JobPositionNotFoundError } from "@omega/location/core/domain/job-position/errors/job-position.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { JobPositionRepository } from "../../repository/aggregate.repositories";

export type JobPositionEditCommandPayload = {
    jobPositionId: string;
    jobPositionName: string;
};
export class JobPositionEditCommand implements CommandHandlerAsync<JobPositionEditCommandPayload, void> {
    constructor(
        private readonly repository: JobPositionRepository
    ) { }

    async handleAsync(value: JobPositionEditCommandPayload): Promise<void> {
        const jobPosition = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.jobPositionId }] });
        if (!jobPosition) throw new JobPositionNotFoundError(value.jobPositionId);

        jobPosition.rename(value.jobPositionName);
        await this.repository.saveAsync(jobPosition);
    }
}