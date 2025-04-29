/* eslint-disable @typescript-eslint/unbound-method */
import { JobPositionNotFoundError } from "@omega/location/core/domain/job-position/errors/job-position.errors";
import { JobPosition } from "@omega/location/core/domain/job-position/job-position.domain";
import { JobPositionEditCommand, JobPositionEditCommandImpl, JobPositionEditCommandPayload } from "../job-position-edit.command";
import { JobPositionRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("JobPositionEditCommand", () => {
    let repository: jest.Mocked<JobPositionRepository>;
    let command: JobPositionEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<JobPositionRepository>;

        command = new JobPositionEditCommandImpl(repository);
    });

    it("should successfully rename the job position if it exists", async () => {
        const payload: JobPositionEditCommandPayload = { jobPositionId: "123", jobPositionName: "Senior Software Engineer" };
        const jobPosition = { id: "123", rename: jest.fn() } as unknown as JobPosition;

        repository.findOneAsync.mockResolvedValue(jobPosition);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.jobPositionId }] });
        expect(jobPosition.rename).toHaveBeenCalledWith(payload.jobPositionName);
        expect(repository.saveAsync).toHaveBeenCalledWith(jobPosition);
    });

    it("should throw an error if the job position does not exist", async () => {
        const payload: JobPositionEditCommandPayload = { jobPositionId: "123", jobPositionName: "Senior Software Engineer" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(JobPositionNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.jobPositionId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});