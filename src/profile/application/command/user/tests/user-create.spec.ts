/* eslint-disable @typescript-eslint/unbound-method */
import { User } from "@omega/profile/core/domain/user/user.domain";
import { AuthProvider } from "@shared/shared/providers/auth.provider";
import { UserCreateCommand, UserCreateCommandPayload } from "../user-create.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { UserConflictError } from "@omega/profile/core/domain/user/errors/user.errors";

describe("UserCreateCommand", () => {
    let repository: jest.Mocked<UserRepository>;
    let auth: jest.Mocked<AuthProvider>;
    let handler: UserCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        auth = {
            createAuth: jest.fn(),
            addResources: jest.fn(),
            addLogo: jest.fn()
        } as unknown as jest.Mocked<AuthProvider>;

        handler = new UserCreateCommand(repository, auth);
    });

    it("should create a user with authentication details when the user does not already exist", async () => {
        const mockUser: User = {
            email: "user@example.com",
            lastname: "Doe",
            name: "John",
            addAuth: jest.fn(),
            addResources: jest.fn()
        } as unknown as User;

        jest.spyOn(User, "create").mockReturnValue(mockUser);

        const mockAuth = "auth-value";

        const payload: UserCreateCommandPayload = {
            logo: 'sample',
            resources: ["my-resource"],
            dni: "1234567890",
            name: "John",
            lastname: "Doe",
            email: "user@example.com",
            password: "securepassword",
        };

        repository.findOneAsync.mockResolvedValue(null);
        auth.createAuth.mockResolvedValue(mockAuth);

        await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'dni', operator: 'eq', value: payload.dni }],
        });

        expect(auth.createAuth).toHaveBeenCalledWith({
            email: payload.email,
            lastname: payload.lastname,
            name: payload.name,
            password: payload.password,
        });

        expect(mockUser.addAuth).toHaveBeenCalledWith(mockAuth);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockUser);
    });

    it("should throw UserConflictError when the user already exists", async () => {
        const payload: UserCreateCommandPayload = {
            logo: 'sample',
            resources: ["my-resource"],
            dni: "1234567890",
            name: "John",
            lastname: "Doe",
            email: "user@example.com",
            password: "securepassword",
        };

        const mockExistingUser = { addResources: jest.fn() } as unknown as User;
        repository.findOneAsync.mockResolvedValue(mockExistingUser);

        await expect(handler.handleAsync(payload)).rejects.toThrow(UserConflictError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: 'dni', operator: 'eq', value: payload.dni }],
        });

        expect(auth.createAuth).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
