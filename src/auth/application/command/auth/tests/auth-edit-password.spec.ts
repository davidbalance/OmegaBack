/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { PasswordProvider } from "@shared/shared/providers/password.provider";
import { AuthEditPasswordCommand, AuthEditPasswordCommandPayload } from "../auth-edit-password.command";

describe("AuthEditPasswordCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let hash: jest.Mocked<PasswordProvider>;
    let command: AuthEditPasswordCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        hash = {
            hash: jest.fn(),
        } as unknown as jest.Mocked<PasswordProvider>;

        command = new AuthEditPasswordCommand(repository, hash);
    });

    it("should update the password when auth exists", async () => {
        const mockAuth = {
            updatePassword: jest.fn(),
        } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockAuth);
        hash.hash.mockReturnValue("hashed-password");
        repository.saveAsync.mockResolvedValue();

        const payload: AuthEditPasswordCommandPayload = {
            email: "exist@email.com",
            password: "new-password",
        };

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "email", operator: "eq", value: payload.email }],
        });
        expect(hash.hash).toHaveBeenCalledWith(payload.password);
        expect(mockAuth.updatePassword).toHaveBeenCalledWith("hashed-password");
        expect(repository.saveAsync).toHaveBeenCalledWith(mockAuth);
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: AuthEditPasswordCommandPayload = {
            email: "exist@email.com",
            password: "new-password",
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(AuthNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "email", operator: "eq", value: payload.email }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
