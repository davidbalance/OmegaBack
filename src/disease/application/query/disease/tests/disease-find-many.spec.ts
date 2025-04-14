/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseRepository } from "@omega/disease/application/repository/model.repositories";
import { DiseaseFindManyQuery, DiseaseFindManyQueryPayload } from "../disease-find-many.query";
import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";

describe("DiseaseFindManyQuery", () => {
    let repository: jest.Mocked<DiseaseRepository>;
    let query: DiseaseFindManyQuery;

    beforeEach(() => {
        repository = {
            findManyAsync: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<DiseaseRepository>;

        query = new DiseaseFindManyQuery(repository);
    });

    it("should return a list of diseases for a valid groupId with pagination and ordering", async () => {
        const payload: DiseaseFindManyQueryPayload = {
            groupId: "group-1",
            skip: 1,
            limit: 10
        };
        const diseases: DiseaseModel[] = [
            { id: "disease-1", name: "Flu", groupId: "group-1" },
            { id: "disease-2", name: "Covid-19", groupId: "group-1" }
        ] as unknown as DiseaseModel[];

        repository.findManyAsync.mockResolvedValue(diseases);
        repository.countAsync.mockResolvedValue(diseases.length);

        const result = await query.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: [{ field: "groupId", operator: "eq", value: payload.groupId }]
        });
        expect(result).toEqual({ data: diseases, amount: diseases.length });
    });

    it("should return an empty array when no diseases are found", async () => {
        const payload: DiseaseFindManyQueryPayload = {
            groupId: "group-1",
            skip: 1,
            limit: 10
        };

        repository.findManyAsync.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await query.handleAsync(payload);

        expect(repository.findManyAsync).toHaveBeenCalledWith({
            ...payload,
            filter: [{ field: "groupId", operator: "eq", value: payload.groupId }]
        });
        expect(result).toEqual({ data: [], amount: 0 });
    });
});
