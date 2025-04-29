/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseRepository } from "@omega/disease/application/repository/model.repositories";
import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { DiseaseFindOneQuery, DiseaseFindOneQueryImpl, DiseaseFindOneQueryPayload } from "../disease-find-one.query";
import { DiseaseModel } from "@omega/disease/core/model/disease/disease.model";

describe("DiseaseFindOneQuery", () => {
    let repository: jest.Mocked<DiseaseRepository>;
    let query: DiseaseFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<DiseaseRepository>;

        query = new DiseaseFindOneQueryImpl(repository);
    });

    it("should return a disease when a valid diseaseId is found", async () => {
        const payload: DiseaseFindOneQueryPayload = { diseaseId: "disease-1" };
        const disease: DiseaseModel = { diseaseId: "disease-1" } as unknown as DiseaseModel;

        repository.findOneAsync.mockResolvedValue(disease);

        const result = await query.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "diseaseId", operator: "eq", value: payload.diseaseId }
        ]);
        expect(result).toEqual(disease);
    });

    it("should throw DiseaseGroupNotFoundError when the disease does not exist", async () => {
        const payload: DiseaseFindOneQueryPayload = { diseaseId: "disease-2" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(query.handleAsync(payload)).rejects.toThrow(DiseaseGroupNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([
            { field: "diseaseId", operator: "eq", value: payload.diseaseId }
        ]);
    });
});
