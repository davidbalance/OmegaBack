import { JobPosition } from "@omega/location/core/domain/job-position/job-position.domain";
import { CreateJobPositionPayload } from "@omega/location/core/domain/job-position/payloads/job-position.payloads";
import { CommandHandlerAsync } from "@shared/shared/application";
import { JobPositionRepository } from "../../repository/aggregate.repositories";
import { JobPositionConflictError } from "@omega/location/core/domain/job-position/errors/job-position.errors";

export type JobPositionCreateCommandPayload = CreateJobPositionPayload;
export interface JobPositionCreateCommand extends CommandHandlerAsync<JobPositionCreateCommandPayload, void> { }

export class JobPositionCreateCommandImpl implements JobPositionCreateCommand {
    constructor(
        private readonly repository: JobPositionRepository
    ) { }

    async handleAsync(value: CreateJobPositionPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new JobPositionConflictError(value.name);

        const jobPosition = JobPosition.create(value);
        await this.repository.saveAsync(jobPosition);
    }
}