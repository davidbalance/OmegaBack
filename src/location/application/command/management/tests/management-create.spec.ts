/* eslint-disable @typescript-eslint/unbound-method */
import { Management } from "@omega/location/core/domain/management/management.domain";
import { ManagementCreateCommand, ManagementCreateCommandPayload } from "../management-create.command";
import { ManagementRepository } from "@omega/location/application/repository/aggregate.repositories";
import { ManagementConflictError } from "@omega/location/core/domain/management/errors/management.errors";

describe("ManagementCreateCommand", () => {
    let repository: jest.Mocked<ManagementRepository>;
    let command: ManagementCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ManagementRepository>;

        command = new ManagementCreateCommand(repository);
    });

    it("should successfully create management if name does not exist", async () => {
        const payload: ManagementCreateCommandPayload = { name: "New Management" };
        const mockManagement = { create: jest.fn() } as unknown as Management;
        jest.spyOn(Management, "create").mockReturnValue(mockManagement);

        repository.findOneAsync.mockResolvedValue(null);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'name', operator: 'eq', value: payload.name }] });
        expect(Management.create).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockManagement);
    });

    it("should throw an error if management with the same name already exists", async () => {
        const payload: ManagementCreateCommandPayload = { name: "Existing Management" };

        const existingManagement = { name: "Existing Management" } as unknown as Management;
        repository.findOneAsync.mockResolvedValue(existingManagement);

        await expect(command.handleAsync(payload)).rejects.toThrow(ManagementConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'name', operator: 'eq', value: payload.name }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});