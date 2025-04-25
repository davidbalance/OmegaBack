/* eslint-disable @typescript-eslint/unbound-method */
import { JobPositionOptionModel } from "@omega/location/core/models/jobPosition/job-position-option.model";
import { JobPositionFindOptionsQuery, JobPositionFindOptionsQueryImpl } from "../job-position-find-options.query";
import { JobPositionOptionRepository } from "@omega/location/application/repository/model.repositories";

describe("JobPositionFindOptionsQuery", () => {
    let repository: jest.Mocked<JobPositionOptionRepository>;
    let handler: JobPositionFindOptionsQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<JobPositionOptionRepository>;

        handler = new JobPositionFindOptionsQueryImpl(repository);
    });

    it("should return job position options when data exists", async () => {
        const mockJobPositionOptions: JobPositionOptionModel[] = [
            { jobPositionValue: "developer", jobPositionLabel: "Developer" },
            { jobPositionValue: "designer", jobPositionLabel: "Designer" },
        ] as JobPositionOptionModel[];

        mockJobPositionOptions.forEach((option) => {
            option.toOption = jest.fn(() => ({
                value: option.jobPositionValue,
                label: option.jobPositionLabel,
            }));
        });

        repository.findManyAsync.mockResolvedValue(mockJobPositionOptions);

        const result = await handler.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual([
            { value: "developer", label: "Developer" },
            { value: "designer", label: "Designer" },
        ]);
    });

    it("should return an empty array when no job position options are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const result = await handler.handleAsync();

        expect(result).toEqual([]);
    });
});
