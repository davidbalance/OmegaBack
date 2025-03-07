/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthConflictError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { PasswordProvider } from "@shared/shared/providers/password.provider";
import { AuthCreateCommand, AuthCreateCommandPayload } from "../auth-create.command";

describe("AuthCreateCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let hash: jest.Mocked<PasswordProvider>;
    let command: AuthCreateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        hash = {
            hash: jest.fn(),
        } as unknown as jest.Mocked<PasswordProvider>;

        command = new AuthCreateCommand(repository, hash);
    });

    it("should create a new auth when email does not exist", async () => {
        const mockAuth = {
            id: "auth-1",
            password: "hashed-password",
        } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(null); // Simulate email not found
        hash.hash.mockReturnValue("hashed-password");
        const spy = jest.spyOn(Auth, 'create').mockReturnValue(mockAuth);
        repository.saveAsync.mockResolvedValue();

        const payload: AuthCreateCommandPayload = {
            email: "test@example.com",
            password: "plainpassword",
            name: "Stub name",
            lastname: "Stub lastname"
        };

        const result = await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "email", operator: "eq", value: payload.email }],
        });
        expect(hash.hash).toHaveBeenCalledWith(payload.password);
        expect(spy).toHaveBeenCalled();
        expect(result).toBe(mockAuth.id);
    });

    it("should throw AuthConflictError when email already exists", async () => {
        const mockAuth = {
            id: "auth-1",
            email: "test@example.com",
            password: "hashed-password",
        } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockAuth); // Simulate email already exists

        const payload: AuthCreateCommandPayload = {
            email: "test@example.com",
            password: "plainpassword",
            name: "Stub name",
            lastname: "Stub lastname"
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(
            new AuthConflictError(payload.email)
        );

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "email", operator: "eq", value: payload.email }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
