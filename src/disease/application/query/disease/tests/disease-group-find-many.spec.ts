/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupRepository } from "@omega/disease/application/repository/model.repositories";
import { DiseaseGroupFindManyQuery, DiseaseGroupFindManyQueryPayload } from "../disease-group-find-many.query";
import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";

describe("DiseaseGroupFindManyQuery", () => {
    let repository: jest.Mocked<DiseaseGroupRepository>;
    let query: DiseaseGroupFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<DiseaseGroupRepository>;

        query = new DiseaseGroupFindManyQuery(repository);
    });

    it("should return a list of disease groups when repository finds data", async () => {
        const payload: DiseaseGroupFindManyQueryPayload = {
            skip: 1,
            limit: 10
        };
        const diseaseGroups: DiseaseGroupModel[] = [
            { groupId: "group-1", groupName: "Viral Infections", hasDiseases: true },
            { groupId: "group-2", groupName: "Bacterial Infections", hasDiseases: true }
        ] as unknown as DiseaseGroupModel[];

        repository.findManyAsync.mockResolvedValue(diseaseGroups);
        repository.countAsync.mockResolvedValue(diseaseGroups.length);

        const result = await query.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: []
        });
        expect(result).toEqual({ data: diseaseGroups, amount: diseaseGroups.length });
    });

    it("should return an empty array when no disease groups are found", async () => {
        const payload: DiseaseGroupFindManyQueryPayload = {
            skip: 1,
            limit: 10
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await query.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: []
        });
        expect(result).toEqual({ data: [], amount: 0 });
    });
});
