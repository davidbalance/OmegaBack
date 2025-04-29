/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupRepository } from "@omega/disease/application/repository/model.repositories";
import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { DiseaseGroupModel } from "@omega/disease/core/model/disease/disease-group.model";
import { DiseaseGroupFindOneQuery, DiseaseGroupFindOneQueryImpl, DiseaseGroupFindOneQueryPayload } from "../disease-group-find-one.query";

describe("DiseaseGroupFindOneQuery", () => {
    let repository: jest.Mocked<DiseaseGroupRepository>;
    let query: DiseaseGroupFindOneQuery;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn()
        } as unknown as jest.Mocked<DiseaseGroupRepository>;

        query = new DiseaseGroupFindOneQueryImpl(repository);
    });

    it("should return a disease group when a valid groupId is found", async () => {
        const payload: DiseaseGroupFindOneQueryPayload = { groupId: "group-1" };
        const group: DiseaseGroupModel = { id: "group-1", name: "Viral Diseases" } as unknown as DiseaseGroupModel;

        repository.findOneAsync.mockResolvedValue(group);

        const result = await query.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: "groupId", operator: "eq", value: payload.groupId }]);
        expect(result).toEqual(group);
    });

    it("should throw DiseaseGroupNotFoundError when the group does not exist", async () => {
        const payload: DiseaseGroupFindOneQueryPayload = { groupId: "group-2" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(query.handleAsync(payload)).rejects.toThrow(DiseaseGroupNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith([{ field: "groupId", operator: "eq", value: payload.groupId }]);
    });
});
