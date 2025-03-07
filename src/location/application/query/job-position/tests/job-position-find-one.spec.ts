/* eslint-disable @typescript-eslint/unbound-method */
import { JobPositionNotFoundError } from "@omega/location/core/domain/job-position/errors/job-position.errors";
import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";
import { JobPositionFindOneQuery, JobPositionFindOneQueryPayload } from "../job-position-find-one.query";
import { JobPositionRepository } from "@omega/location/application/repository/model.repositories";

describe("JobPositionFindOneQuery", () => {
    let repository: jest.Mocked<JobPositionRepository>;
    let handler: JobPositionFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<JobPositionRepository>;

        handler = new JobPositionFindOneQuery(repository);
    });

    it("should retrieve a job position when it exists", async () => {
        const mockJobPosition: JobPositionModel = { jobPositionId: "1", jobPositionName: "Software Engineer" } as unknown as JobPositionModel;

        repository.findOneAsync.mockResolvedValue(mockJobPosition);

        const query: JobPositionFindOneQueryPayload = { jobPositionId: "1" };

        const result = await handler.handleAsync(query);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "jobPositionId", operator: "eq", value: query.jobPositionId },
        ]);
        expect(result).toEqual(mockJobPosition);
    });

    it("should throw JobPositionNotFoundError when job position does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const query: JobPositionFindOneQueryPayload = { jobPositionId: "1" };

        await expect(handler.handleAsync(query)).rejects.toThrow(JobPositionNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "jobPositionId", operator: "eq", value: query.jobPositionId },
        ]);
    });
});
