/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";
import { DiseaseCreateCommand, DiseaseCreateCommandPayload } from "../disease-create.command";

describe("DiseaseCreateCommand", () => {
    let repository: jest.Mocked<DiseaseGroupRepository>;
    let command: DiseaseCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<DiseaseGroupRepository>;

        command = new DiseaseCreateCommand(repository);
    });

    it("should add a disease to an existing group and save it successfully", async () => {
        const mockedGroup: DiseaseGroup = { addDisease: jest.fn() } as unknown as DiseaseGroup;
        const payload: DiseaseCreateCommandPayload = { groupId: "group-1", diseaseName: "Flu" };

        repository.findOneAsync.mockResolvedValue(mockedGroup);
        repository.saveAsync.mockResolvedValue();

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(mockedGroup.addDisease).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedGroup);
    });

    it("should throw DiseaseGroupNotFoundError when the group does not exist", async () => {
        const payload: DiseaseCreateCommandPayload = { groupId: "non-existent-group", diseaseName: "Flu" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(DiseaseGroupNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.groupId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});