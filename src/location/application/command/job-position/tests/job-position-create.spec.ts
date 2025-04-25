/* eslint-disable @typescript-eslint/unbound-method */
import { JobPosition } from "@omega/location/core/domain/job-position/job-position.domain";
import { JobPositionCreateCommand, JobPositionCreateCommandImpl, JobPositionCreateCommandPayload } from "../job-position-create.command";
import { JobPositionRepository } from "@omega/location/application/repository/aggregate.repositories";
import { JobPositionConflictError } from "@omega/location/core/domain/job-position/errors/job-position.errors";

describe("JobPositionCreateCommand", () => {
    let repository: jest.Mocked<JobPositionRepository>;
    let command: JobPositionCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<JobPositionRepository>;

        command = new JobPositionCreateCommandImpl(repository);
    });

    it("should successfully create a job position if the name is unique", async () => {
        const payload: JobPositionCreateCommandPayload = { name: "Software Engineer" };
        const mockJobPosition = { name: payload.name, create: jest.fn() } as unknown as JobPosition;

        repository.findOneAsync.mockResolvedValue(null);
        jest.spyOn(JobPosition, "create").mockReturnValue(mockJobPosition);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(JobPosition.create).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockJobPosition);
    });

    it("should throw an error if the job position name already exists", async () => {
        const payload: JobPositionCreateCommandPayload = { name: "Software Engineer" };
        const existingJobPosition = { name: payload.name } as unknown as JobPosition;

        repository.findOneAsync.mockResolvedValue(existingJobPosition);

        await expect(command.handleAsync(payload)).rejects.toThrow(JobPositionConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});