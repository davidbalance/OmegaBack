/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { AuthInvalidCredencialError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { PasswordProvider } from "@shared/shared/providers/password.provider";
import { AuthValidateCommand } from "../auth-validate.command";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";

describe("AuthValidateCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let hash: jest.Mocked<PasswordProvider>;
    let command: AuthValidateCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        hash = {
            compare: jest.fn(),
        } as unknown as jest.Mocked<PasswordProvider>;

        command = new AuthValidateCommand(repository, hash);
    });

    it("should validate credentials successfully when email and password match", async () => {
        const email = "test@example.com";
        const password = "password123";
        const storedPassword = "hashed-password";
        const mockAuth: Auth = {
            email,
            password: storedPassword
        } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockAuth);
        hash.compare.mockReturnValue(true);

        await command.handleAsync({ email, password });

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "email", operator: "eq", value: email }],
        });
        expect(hash.compare).toHaveBeenCalledWith(password, storedPassword);
    });

    it("should throw AuthInvalidCredencialError when email does not exist", async () => {
        const email = "nonexistent@example.com";
        const password = "password123";

        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync({ email, password })).rejects.toThrow(AuthInvalidCredencialError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "email", operator: "eq", value: email }],
        });
        expect(hash.compare).not.toHaveBeenCalled();
    });

    it("should throw AuthInvalidCredencialError when password does not match", async () => {
        const email = "test@example.com";
        const password = "incorrect-password";
        const storedPassword = "hashed-password";
        const mockAuth: Auth = {
            email,
            password: storedPassword
        } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockAuth);
        hash.compare.mockReturnValue(false);

        await expect(command.handleAsync({ email, password })).rejects.toThrow(AuthInvalidCredencialError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "email", operator: "eq", value: email }],
        });
        expect(hash.compare).toHaveBeenCalledWith(password, storedPassword);
    });
});
