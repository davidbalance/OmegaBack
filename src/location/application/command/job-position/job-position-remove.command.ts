import { JobPositionNotFoundError } from "@omega/location/core/domain/job-position/errors/job-position.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { JobPositionRepository } from "../../repository/aggregate.repositories";

export type JobPositionRemoveCommandPayload = {
    jobPositionId: string;
};
export interface JobPositionRemoveCommand extends CommandHandlerAsync<JobPositionRemoveCommandPayload, void> { }

export class JobPositionRemoveCommandImpl implements JobPositionRemoveCommand {
    constructor(
        private readonly repository: JobPositionRepository
    ) { }

    async handleAsync(value: JobPositionRemoveCommandPayload): Promise<void> {
        const jobPosition = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.jobPositionId }] });
        if (!jobPosition) throw new JobPositionNotFoundError(value.jobPositionId);

        jobPosition.remove();
        await this.repository.saveAsync(jobPosition);
    }
}