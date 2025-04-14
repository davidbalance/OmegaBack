/* eslint-disable @typescript-eslint/unbound-method */
import { ResourceNotFoundError } from "@omega/auth/core/domain/resource/errors/resource.errors";
import { Resource } from "@omega/auth/core/domain/resource/resource.domain";
import { ResourceEditCommand, ResourceEditCommandPayload } from "../resource-edit.command";
import { ResourceRepository } from "@omega/auth/application/repository/resource/aggregate.repositories";

describe("ResourceEditCommand", () => {
    let repository: jest.Mocked<ResourceRepository>;
    let command: ResourceEditCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ResourceRepository>;

        command = new ResourceEditCommand(repository);
    });

    it("should edit resource successfully when resource exists", async () => {
        const resourceId = "resource-id";
        const payload: ResourceEditCommandPayload = { resourceId, address: "new/address" };

        const mockResource = { edit: jest.fn() } as unknown as Resource;
        repository.findOneAsync.mockResolvedValue(mockResource);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: resourceId }],
        });
        expect(mockResource.edit).toHaveBeenCalledWith(payload);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockResource);
    });

    it("should throw ResourceNotFoundError when resource does not exist", async () => {
        const resourceId = "non-existing-resource-id";
        const payload: ResourceEditCommandPayload = { resourceId, address: "new/address" };

        repository.findOneAsync.mockResolvedValue(null); // Simulate that resource does not exist.

        await expect(command.handleAsync(payload)).rejects.toThrow(ResourceNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: resourceId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
