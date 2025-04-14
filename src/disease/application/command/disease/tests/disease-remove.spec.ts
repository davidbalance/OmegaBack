/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { DiseaseRemoveCommand, DiseaseRemoveCommandPayload } from "../disease-remove.command";
import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";

describe("DiseaseRemoveCommand", () => {
    let repository: jest.Mocked<DiseaseGroupRepository>;
    let command: DiseaseRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<DiseaseGroupRepository>;

        command = new DiseaseRemoveCommand(repository);
    });

    it("should remove a disease from an existing group and save it successfully", async () => {
        const mockedGroup: DiseaseGroup = { removeDisease: jest.fn() } as unknown as DiseaseGroup;
        const payload: DiseaseRemoveCommandPayload = { groupId: "group-1", diseaseId: "disease-1" };

        repository.findOneAsync.mockResolvedValue(mockedGroup);
        repository.saveAsync.mockResolvedValue();

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(mockedGroup.removeDisease).toHaveBeenCalledWith(payload.diseaseId);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedGroup);
    });

    it("should throw DiseaseGroupNotFoundError when the group does not exist", async () => {
        const payload: DiseaseRemoveCommandPayload = { groupId: "non-existent-group", diseaseId: "disease-1" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(DiseaseGroupNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
