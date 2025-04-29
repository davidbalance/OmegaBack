/* eslint-disable @typescript-eslint/unbound-method */
import { ResourceConflictError } from "@omega/auth/core/domain/resource/errors/resource.errors";
import { ResourceCreateCommand, ResourceCreateCommandImpl } from "../resource-create.command";
import { Resource } from "@omega/auth/core/domain/resource/resource.domain";
import { ResourceRepository } from "@omega/auth/application/repository/resource/aggregate.repositories";
import { CreateResourcePayload } from "@omega/auth/core/domain/resource/payloads/resource.payload";

describe("ResourceCreateCommand", () => {
    let repository: jest.Mocked<ResourceRepository>;
    let command: ResourceCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<ResourceRepository>;

        command = new ResourceCreateCommandImpl(repository);
    });

    it("should create resource successfully when resource key does not exist", async () => {
        const payload: CreateResourcePayload = {
            order: 1,
            address: "http://sample.com",
            icon: "this is my icon",
            label: "Stub"
        };

        repository.findOneAsync.mockResolvedValue(null); // Simulating that the resource does not exist.

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "address", operator: "eq", value: payload.address }],
        });
        expect(repository.saveAsync).toHaveBeenCalled();
    });

    it("should throw ResourceConflictError when resource key already exists", async () => {
        const address = "http://sample.com";
        const payload: CreateResourcePayload = {
            order: 1,
            address: address,
            icon: "this is my icon",
            label: "Stub"
        };
        const mockResource: Resource = {
            address: address
        } as unknown as Resource

        repository.findOneAsync.mockResolvedValue(mockResource); // Simulating that the resource already exists.

        await expect(command.handleAsync(payload)).rejects.toThrow(ResourceConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "address", operator: "eq", value: address }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
