/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { DiseaseGroupCreateCommand, DiseaseGroupCreateCommandImpl, DiseaseGroupCreateCommandPayload } from "../disease-group-create.command";
import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { DiseaseGroupConflictError } from "@omega/disease/core/domain/errors/disease-group.errors";

describe("DiseaseGroupCreateCommand", () => {
    let repository: jest.Mocked<DiseaseGroupRepository>;
    let command: DiseaseGroupCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<DiseaseGroupRepository>;

        command = new DiseaseGroupCreateCommandImpl(repository);
    });

    it("should create a new disease group when no conflict exists", async () => {
        const payload: DiseaseGroupCreateCommandPayload = { name: "New Disease Group" };

        repository.findOneAsync.mockResolvedValue(null);
        repository.saveAsync.mockResolvedValue();

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(repository.saveAsync).toHaveBeenCalled();
    });

    it("should throw DiseaseGroupConflictError when a group with the same name already exists", async () => {
        const payload: DiseaseGroupCreateCommandPayload = { name: "Existing Disease Group" };

        repository.findOneAsync.mockResolvedValue({} as unknown as DiseaseGroup);

        await expect(command.handleAsync(payload)).rejects.toThrow(DiseaseGroupConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "name", operator: "eq", value: payload.name }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
