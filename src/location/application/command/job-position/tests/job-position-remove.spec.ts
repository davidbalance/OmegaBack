/* eslint-disable @typescript-eslint/unbound-method */
import { JobPositionNotFoundError } from "@omega/location/core/domain/job-position/errors/job-position.errors";
import { JobPosition } from "@omega/location/core/domain/job-position/job-position.domain";
import { JobPositionRemoveCommand, JobPositionRemoveCommandPayload } from "../job-position-remove.command";
import { JobPositionRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("JobPositionRemoveCommand", () => {
    let repository: jest.Mocked<JobPositionRepository>;
    let command: JobPositionRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<JobPositionRepository>;

        command = new JobPositionRemoveCommand(repository);
    });

    it("should successfully remove the job position if it exists", async () => {
        const payload: JobPositionRemoveCommandPayload = { jobPositionId: "123" };
        const jobPosition = { id: "123", remove: jest.fn() } as unknown as JobPosition;

        repository.findOneAsync.mockResolvedValue(jobPosition);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.jobPositionId }] });
        expect(jobPosition.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(jobPosition);
    });

    it("should throw an error if the job position does not exist", async () => {
        const payload: JobPositionRemoveCommandPayload = { jobPositionId: "123" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(JobPositionNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.jobPositionId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});