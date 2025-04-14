/* eslint-disable @typescript-eslint/unbound-method */
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { AuthProvider } from "@shared/shared/providers/auth.provider";
import { UserAddResourcesCommand } from "../user-add-resources.command";
import { User } from "@omega/profile/core/domain/user/user.domain";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";

describe("UserAddResourcesCommand", () => {
    let repository: jest.Mocked<UserRepository>;
    let authProvider: jest.Mocked<AuthProvider>;
    let command: UserAddResourcesCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        authProvider = {
            addResources: jest.fn(),
        } as unknown as jest.Mocked<AuthProvider>;

        command = new UserAddResourcesCommand(repository, authProvider);
    });

    it("should add resources when user exists and has authentication", async () => {
        const payload = { userId: "user123", resources: ["resource1", "resource2"] };
        const mockedUser = { id: "user123", auth: "authId" } as unknown as User;

        repository.findOneAsync.mockResolvedValue(mockedUser);
        authProvider.addResources.mockResolvedValue();

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.userId }],
        });
        expect(authProvider.addResources).toHaveBeenCalledWith({
            authId: "authId",
            resources: payload.resources,
        });
    });

    it("should throw UserNotFoundError if user does not exist", async () => {
        const payload = { userId: "nonExistentUser", resources: ["resource1"] };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(UserNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.userId }],
        });
        expect(authProvider.addResources).not.toHaveBeenCalled();
    });

    it("should throw UserNotFoundError if user does not have authentication", async () => {
        const payload = { userId: "user123", resources: ["resource1"] };
        const mockedUser = { id: "user123", auth: null } as unknown as User;

        repository.findOneAsync.mockResolvedValue(mockedUser);

        await expect(command.handleAsync(payload)).rejects.toThrow(UserNotFoundError);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.userId }],
        });
        expect(authProvider.addResources).not.toHaveBeenCalled();
    });
});
