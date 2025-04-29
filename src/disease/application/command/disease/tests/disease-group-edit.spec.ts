/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { DiseaseGroupEditCommand, DiseaseGroupEditCommandImpl, DiseaseGroupEditCommandPayload } from "../disease-group-edit.command";

describe("DiseaseGroupEditCommand", () => {
    let repository: jest.Mocked<DiseaseGroupRepository>;
    let command: DiseaseGroupEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<DiseaseGroupRepository>;

        command = new DiseaseGroupEditCommandImpl(repository);
    });

    it("should rename an existing disease group and save it successfully", async () => {
        const mockedGroup: DiseaseGroup = { rename: jest.fn() } as unknown as DiseaseGroup;
        const payload: DiseaseGroupEditCommandPayload = { groupId: "group-1", groupName: "Updated Disease Group" };

        repository.findOneAsync.mockResolvedValue(mockedGroup);
        repository.saveAsync.mockResolvedValue();

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(mockedGroup.rename).toHaveBeenCalledWith(payload.groupName);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedGroup);
    });

    it("should throw DiseaseGroupNotFoundError when the group does not exist", async () => {
        const payload: DiseaseGroupEditCommandPayload = { groupId: "non-existent-group", groupName: "Updated Disease Group" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(DiseaseGroupNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
