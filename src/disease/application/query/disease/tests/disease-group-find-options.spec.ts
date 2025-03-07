/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupOptionRepository } from "@omega/disease/application/repository/model.repositories";
import { DiseaseGroupOptionModel } from "@omega/disease/core/model/disease/disease-group-option.model";
import { DiseaseGroupFindOptionsQuery } from "../disease-group-find-options.query";

describe("DiseaseGroupFindOptionsQuery", () => {
    let repository: jest.Mocked<DiseaseGroupOptionRepository>;
    let query: DiseaseGroupFindOptionsQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn()
        } as unknown as jest.Mocked<DiseaseGroupOptionRepository>;

        query = new DiseaseGroupFindOptionsQuery(repository);
    });

    it("should return grouped disease group options when repository finds data", async () => {
        const options: DiseaseGroupOptionModel[] = [
            { groupValue: "group-1", groupLabel: "Group 1", diseaseLabel: "Disease A", diseaseValue: "disease-1" },
            { groupValue: "group-1", groupLabel: "Group 1", diseaseLabel: "Disease B", diseaseValue: "disease-2" },
            { groupValue: "group-2", groupLabel: "Group 2", diseaseLabel: "Disease C", diseaseValue: "disease-3" }
        ] as unknown as DiseaseGroupOptionModel[];

        repository.findManyAsync.mockResolvedValue(options);

        const result = await query.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual([
            {
                value: "group-1",
                label: "Group 1",
                children: [
                    { label: "Disease A", value: "disease-1" },
                    { label: "Disease B", value: "disease-2" }
                ]
            },
            {
                value: "group-2",
                label: "Group 2",
                children: [
                    { label: "Disease C", value: "disease-3" }
                ]
            }
        ]);
    });

    it("should return an empty array when no disease group options are found", async () => {
        repository.findManyAsync.mockResolvedValue([]);

        const result = await query.handleAsync();

        expect(repository.findManyAsync).toHaveBeenCalledWith({ filter: [] });
        expect(result).toEqual([]);
    });
});
