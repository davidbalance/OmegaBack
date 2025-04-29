/* eslint-disable @typescript-eslint/unbound-method */
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { DiseaseMoveToGroupCommand, DiseaseMoveToGroupCommandImpl, DiseaseMoveToGroupCommandPayload } from "../disease-move-to-group.command";
import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { DiseaseGroupNotFoundError } from "@omega/disease/core/domain/errors/disease-group.errors";

describe("DiseaseMoveToGroupCommand", () => {
    let repository: jest.Mocked<DiseaseGroupRepository>;
    let command: DiseaseMoveToGroupCommand;

    beforeEach(() => {
        repository = { findOneAsync: jest.fn(), saveAsync: jest.fn() } as unknown as jest.Mocked<DiseaseGroupRepository>;
        command = new DiseaseMoveToGroupCommandImpl(repository);
    });

    it("should successfully move disease from one group to another", async () => {
        const payload: DiseaseMoveToGroupCommandPayload = {
            toGroupId: "to-group-id",
            fromGroupId: "from-group-id",
            diseaseId: "disease-id"
        };

        const fromGroup = { id: "from-group-id", moveDiseaseTo: jest.fn() } as unknown as DiseaseGroup;
        const toGroup = { id: "to-group-id" } as unknown as DiseaseGroup;


        repository.findOneAsync.mockResolvedValueOnce(fromGroup).mockResolvedValueOnce(toGroup);


        repository.saveAsync.mockResolvedValue(undefined);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.fromGroupId }] });
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.toGroupId }] });
        expect(fromGroup.moveDiseaseTo).toHaveBeenCalledWith(toGroup, payload.diseaseId);
        expect(repository.saveAsync).toHaveBeenCalledWith(fromGroup);
    });

    it("should throw DiseaseGroupNotFoundError when from group is not found", async () => {
        const payload: DiseaseMoveToGroupCommandPayload = {
            toGroupId: "to-group-id",
            fromGroupId: "non-existing-group-id",
            diseaseId: "disease-id"
        };

        repository.findOneAsync.mockResolvedValueOnce(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(DiseaseGroupNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.fromGroupId }] });
        expect(repository.findOneAsync).not.toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.toGroupId }] });
    });

    it("should throw DiseaseGroupNotFoundError when to group is not found", async () => {
        const payload: DiseaseMoveToGroupCommandPayload = {
            toGroupId: "non-existing-group-id",
            fromGroupId: "from-group-id",
            diseaseId: "disease-id"
        };

        const fromGroup = { id: "from-group-id", moveDiseaseTo: jest.fn() } as unknown as DiseaseGroup;

        repository.findOneAsync.mockResolvedValueOnce(fromGroup).mockResolvedValueOnce(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(new DiseaseGroupNotFoundError(payload.toGroupId));

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.fromGroupId }] });
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.toGroupId }] });
    });
});
