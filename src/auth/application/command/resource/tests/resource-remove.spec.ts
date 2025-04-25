/* eslint-disable @typescript-eslint/unbound-method */
import { ResourceRepository } from "@omega/auth/application/repository/resource/aggregate.repositories";
import { ResourceNotFoundError } from "@omega/auth/core/domain/resource/errors/resource.errors";
import { Resource } from "@omega/auth/core/domain/resource/resource.domain";
import { ResourceRemoveCommand, ResourceRemoveCommandImpl, ResourceRemoveCommandPayload } from "../resource-remove.command";

describe("ResourceRemoveCommand", () => {
    let repository: jest.Mocked<ResourceRepository>;
    let command: ResourceRemoveCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ResourceRepository>;

        command = new ResourceRemoveCommandImpl(repository);
    });

    it("should remove resource successfully when resource exists", async () => {
        const resourceId = "resource-id";
        const payload: ResourceRemoveCommandPayload = { resourceId };

        const mockResource = { remove: jest.fn() } as unknown as Resource;
        repository.findOneAsync.mockResolvedValue(mockResource);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: resourceId }],
        });
        expect(mockResource.remove).toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockResource);
    });

    it("should throw ResourceNotFoundError when resource does not exist", async () => {
        const resourceId = "non-existing-resource-id";
        const payload: ResourceRemoveCommandPayload = { resourceId };

        repository.findOneAsync.mockResolvedValue(null); // Simulate that resource does not exist.

        await expect(command.handleAsync(payload)).rejects.toThrow(ResourceNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: resourceId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
