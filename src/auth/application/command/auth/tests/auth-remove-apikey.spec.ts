/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthRemoveApiKeyCommand, AuthRemoveApiKeyCommandPayload } from "../auth-remove-apikey.command";

describe("AuthRemoveApiKeyCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let command: AuthRemoveApiKeyCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        command = new AuthRemoveApiKeyCommand(repository);
    });

    it("should remove the API key when auth exists", async () => {
        const mockAuth = {
            removeApiKey: jest.fn(),
        } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockAuth);
        repository.saveAsync.mockResolvedValue();

        const payload: AuthRemoveApiKeyCommandPayload = {
            authId: "auth-1",
            apikeyId: "apikey-1",
        };

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.authId }],
        });
        expect(mockAuth.removeApiKey).toHaveBeenCalledWith(payload.apikeyId);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockAuth);
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: AuthRemoveApiKeyCommandPayload = {
            authId: "auth-1",
            apikeyId: "apikey-1",
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(AuthNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.authId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
