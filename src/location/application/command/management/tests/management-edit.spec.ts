/* eslint-disable @typescript-eslint/unbound-method */
import { ManagementConflictError, ManagementNotFoundError } from "@omega/location/core/domain/management/errors/management.errors";
import { Management } from "@omega/location/core/domain/management/management.domain";
import { ManagementEditCommand, ManagementEditCommandImpl, ManagementEditCommandPayload } from "../management-edit.command";
import { ManagementRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("ManagementEditCommand", () => {
    let repository: jest.Mocked<ManagementRepository>;
    let command: ManagementEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ManagementRepository>;

        command = new ManagementEditCommandImpl(repository);
    });

    it("should successfully edit management if name does not exist", async () => {
        const payload: ManagementEditCommandPayload = { managementId: "123", managementName: "Updated Management" };
        const management = { rename: jest.fn() } as unknown as Management;

        repository.findOneAsync.mockResolvedValueOnce(management);
        repository.findOneAsync.mockResolvedValueOnce(null);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.managementId }] });
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'name', operator: 'eq', value: payload.managementName }] });
        expect(management.rename).toHaveBeenCalledWith(payload.managementName);
        expect(repository.saveAsync).toHaveBeenCalledWith(management);
    });

    it("should throw an error if management with the given ID is not found", async () => {
        const payload: ManagementEditCommandPayload = { managementId: "123", managementName: "Updated Management" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(new ManagementNotFoundError(payload.managementId));

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.managementId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw an error if management with the same name already exists", async () => {
        const payload: ManagementEditCommandPayload = { managementId: "123", managementName: "Existing Management" };
        const existingManagement = { id: "456", name: "Existing Management" } as unknown as Management;

        repository.findOneAsync.mockResolvedValueOnce({ id: "123", name: "Current Management" } as unknown as Management);
        repository.findOneAsync.mockResolvedValueOnce(existingManagement);

        await expect(command.handleAsync(payload)).rejects.toThrow(ManagementConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.managementId }] });
        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'name', operator: 'eq', value: payload.managementName }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});