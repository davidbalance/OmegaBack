/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { ResourceNotFoundError } from "@omega/auth/core/domain/resource/errors/resource.errors";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthAddResourcesCommand, AuthAddResourcesCommandImpl, AuthAddResourcesCommandPayload } from "../auth-add-resources.command";
import { ResourceRepository } from "@omega/auth/application/repository/resource/model.repositories";
import { ResourceModel } from "@omega/auth/core/model/resource/resource.model";

describe("AuthAddResourcesCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let resourceRepository: jest.Mocked<ResourceRepository>;
    let handler: AuthAddResourcesCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        resourceRepository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<ResourceRepository>;

        handler = new AuthAddResourcesCommandImpl(repository, resourceRepository);
    });

    it("should add resources when auth exists", async () => {
        const payload: AuthAddResourcesCommandPayload = { authId: "valid-auth-id", resourceIds: ["resource-1", "resource-2"] };
        const mockedAuth = {
            resources: ["resource-1"],
            addResource: jest.fn(),
            removeResource: jest.fn()
        } as unknown as Auth;

        const mockedResources = [{
            resourceId: "resource-1",
            resourceLabel: "resource-1"
        }, {
            resourceId: "resource-2",
            resourceLabel: "resource-2"
        }] as unknown as ResourceModel[];

        repository.findOneAsync.mockResolvedValue(mockedAuth);
        resourceRepository.findManyAsync.mockResolvedValue(mockedResources);

        await handler.handleAsync(payload);

        expect(mockedAuth.addResource).toHaveBeenCalledWith("resource-2");
        expect(mockedAuth.removeResource).not.toHaveBeenCalled();
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedAuth);
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        const payload: AuthAddResourcesCommandPayload = { authId: "invalid-auth-id", resourceIds: ["resource-1"] };
        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(AuthNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.authId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw ResourceNotFoundError when a resource does not exist", async () => {
        const payload: AuthAddResourcesCommandPayload = { authId: "valid-auth-id", resourceIds: ["resource-1", "missing-resource"] };
        const mockedAuth = {
            resources: ["resource-1"],
            addResource: jest.fn(),
            removeResource: jest.fn()
        } as unknown as Auth;
        const mockedResources = [{
            resourceId: "resource-2",
            resourceLabel: "resource-2"
        }] as unknown as ResourceModel[];

        repository.findOneAsync.mockResolvedValue(mockedAuth);
        resourceRepository.findManyAsync.mockResolvedValue(mockedResources);

        await expect(handler.handleAsync(payload)).rejects.toThrow(ResourceNotFoundError);

        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
