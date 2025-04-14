/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { DiseaseEditCommand, DiseaseEditCommandPayload } from "../disease-edit.command";
import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";

describe("DiseaseEditCommand", () => {
    let repository: jest.Mocked<DiseaseGroupRepository>;
    let command: DiseaseEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<DiseaseGroupRepository>;

        command = new DiseaseEditCommand(repository);
    });

    it("should rename a disease in an existing group and save it successfully", async () => {
        const mockedGroup: DiseaseGroup = { renameDiseaseInGroup: jest.fn() } as unknown as DiseaseGroup;
        const payload: DiseaseEditCommandPayload = { groupId: "group-1", diseaseId: 'disease-1', diseaseName: "Severe Flu" };

        repository.findOneAsync.mockResolvedValue(mockedGroup);
        repository.saveAsync.mockResolvedValue();

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(mockedGroup.renameDiseaseInGroup).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedGroup);
    });

    it("should throw DiseaseGroupNotFoundError when the group does not exist", async () => {
        const payload: DiseaseEditCommandPayload = { groupId: "group-1", diseaseId: 'disease-1', diseaseName: "Severe Flu" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(DiseaseGroupNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
