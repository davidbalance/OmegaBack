/* eslint-disable @typescript-eslint/unbound-method */
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { User } from "@omega/profile/core/domain/user/user.domain";
import { AuthProvider } from "@shared/shared/providers/auth.provider";
import { UserAddAuthCommand, UserAddAuthCommandPayload } from "../user-add-auth.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";

describe("UserAddAuthCommand", () => {
    let repository: jest.Mocked<UserRepository>;
    let auth: jest.Mocked<AuthProvider>;
    let handler: UserAddAuthCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        auth = {
            createAuth: jest.fn(),
            addResources: jest.fn(),
        } as unknown as jest.Mocked<AuthProvider>;

        handler = new UserAddAuthCommand(repository, auth);
    });

    it("should add authentication to the user when the user exists", async () => {
        const mockUser: User = {
            addAuth: jest.fn(),
            email: "user@example.com",
            lastname: "Doe",
            name: "John",
        } as unknown as User;

        const mockAuth = "auth-value";

        const payload: UserAddAuthCommandPayload = {
            userId: "user-123",
            password: "securepassword",
            resources: ["my-resource"]
        };

        repository.findOneAsync.mockResolvedValue(mockUser);
        auth.createAuth.mockResolvedValue(mockAuth);

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(auth.createAuth).toHaveBeenCalledWith({
            email: mockUser.email,
            lastname: mockUser.lastname,
            name: mockUser.name,
            password: payload.password,
        });
        expect(auth.addResources).toHaveBeenCalledWith({ authId: mockAuth, resources: payload.resources });
        expect(mockUser.addAuth).toHaveBeenCalledWith(mockAuth);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockUser);
    });

    it("should throw UserNotFoundError when the user does not exist", async () => {
        const payload: UserAddAuthCommandPayload = {
            userId: "user-123",
            password: "securepassword",
            resources: ["my-resource"]
        };

        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(UserNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(auth.createAuth).not.toHaveBeenCalled();
        expect(auth.addResources).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should throw UserNotFoundEmailError when the user email does not exist", async () => {
        const mockUser: User = {
            email: null
        } as unknown as User;

        const payload: UserAddAuthCommandPayload = {
            userId: "user-123",
            password: "securepassword",
            resources: ["my-resource"]
        };

        repository.findOneAsync.mockResolvedValue(mockUser);

        await expect(handler.handleAsync(payload)).rejects.toThrow(UserNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'id', operator: 'eq', value: payload.userId }],
        });

        expect(auth.createAuth).not.toHaveBeenCalled();
        expect(auth.addResources).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
