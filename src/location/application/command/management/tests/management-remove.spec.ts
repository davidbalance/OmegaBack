/* eslint-disable @typescript-eslint/unbound-method */
import { ManagementNotFoundError } from "@omega/location/core/domain/management/errors/management.errors";
import { Management } from "@omega/location/core/domain/management/management.domain";
import { ManagementRemoveCommand, ManagementRemoveCommandImpl, ManagementRemoveCommandPayload } from "../management-remove.command";
import { ManagementRepository } from "@omega/location/application/repository/aggregate.repositories";

describe("ManagementRemoveCommand", () => {
    let repository: jest.Mocked<ManagementRepository>;
    let command: ManagementRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ManagementRepository>;

        command = new ManagementRemoveCommandImpl(repository);
    });

    it("should successfully remove management", async () => {
        const payload: ManagementRemoveCommandPayload = { managementId: "123" };
        const management = { remove: jest.fn() } as unknown as Management;

        repository.findOneAsync.mockResolvedValue(management);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.managementId }] });
        expect(management.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(management);
    });

    it("should throw an error if management not found", async () => {
        const payload: ManagementRemoveCommandPayload = { managementId: "123" };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(ManagementNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: 'id', operator: 'eq', value: payload.managementId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});