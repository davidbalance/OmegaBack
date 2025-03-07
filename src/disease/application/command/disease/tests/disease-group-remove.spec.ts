/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { DiseaseGroupRemoveCommand, DiseaseGroupRemoveCommandPayload } from "../disease-group-remove.command";

describe("DiseaseGroupRemoveCommand", () => {
    let repository: jest.Mocked<DiseaseGroupRepository>;
    let command: DiseaseGroupRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<DiseaseGroupRepository>;

        command = new DiseaseGroupRemoveCommand(repository);
    });

    it("should remove an existing disease group and save it successfully", async () => {
        const mockedGroup: DiseaseGroup = { remove: jest.fn() } as unknown as DiseaseGroup;
        const payload: DiseaseGroupRemoveCommandPayload = { groupId: "group-1" };

        repository.findOneAsync.mockResolvedValue(mockedGroup);
        repository.saveAsync.mockResolvedValue();

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(mockedGroup.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedGroup);
    });

    it("should throw DiseaseGroupNotFoundError when the group does not exist", async () => {
        const payload: DiseaseGroupRemoveCommandPayload = { groupId: "non-existent-group" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(DiseaseGroupNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
