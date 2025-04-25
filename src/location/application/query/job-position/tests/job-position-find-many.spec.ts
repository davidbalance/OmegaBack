/* eslint-disable @typescript-eslint/unbound-method */
import { JobPositionRepository } from "@omega/location/application/repository/model.repositories";
import { JobPositionFindManyQuery, JobPositionFindManyQueryImpl, JobPositionFindManyQueryPayload } from "../job-position-find-many.query";
import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";

describe("JobPositionFindManyQuery", () => {
    let repository: jest.Mocked<JobPositionRepository>;
    let queryHandler: JobPositionFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<JobPositionRepository>;

        queryHandler = new JobPositionFindManyQueryImpl(repository);
    });

    it("should successfully fetch job positions with pagination and ordering", async () => {
        const queryPayload: JobPositionFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { jobPositionName: "asc" },
        };

        const jobPositions: JobPositionModel[] = [
            { id: "job-1", jobPositionName: "Manager" },
            { id: "job-2", jobPositionName: "Developer" }
        ] as unknown as JobPositionModel[];

        repository.findManyAsync.mockResolvedValue(jobPositions);
        repository.countAsync.mockResolvedValue(jobPositions.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [],
        });
        expect(result).toEqual({ data: jobPositions, amount: jobPositions.length });
    });

    it("should return an empty array if no job positions are found", async () => {
        const queryPayload: JobPositionFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { jobPositionName: "asc" },
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(result).toEqual({ data: [], amount: 0 });
    });

    it("should apply filter when filter is provided", async () => {
        const queryPayload: JobPositionFindManyQueryPayload = {
            filter: "Manager",
            skip: 0,
            limit: 10,
            order: { jobPositionName: "asc" },
        };

        const jobPositions: JobPositionModel[] = [
            { id: "job-1", jobPositionName: "Manager" }
        ] as unknown as JobPositionModel[];

        repository.findManyAsync.mockResolvedValue(jobPositions);
        repository.countAsync.mockResolvedValue(jobPositions.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [{ field: 'jobPositionName', operator: 'like', value: queryPayload.filter }],
        });
        expect(result).toEqual({ data: jobPositions, amount: jobPositions.length });
    });

    it("should return all job positions when no filter is provided", async () => {
        const queryPayload: JobPositionFindManyQueryPayload = {
            skip: 0,
            limit: 10,
            order: { jobPositionName: "asc" },
        };

        const jobPositions: JobPositionModel[] = [
            { id: "job-1", jobPositionName: "Manager" },
            { id: "job-2", jobPositionName: "Developer" }
        ] as unknown as JobPositionModel[];

        repository.findManyAsync.mockResolvedValue(jobPositions);
        repository.countAsync.mockResolvedValue(jobPositions.length);

        const result = await queryHandler.handleAsync(queryPayload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...queryPayload,
            filter: [],
        });
        expect(result).toEqual({ data: jobPositions, amount: jobPositions.length });
    });
});
