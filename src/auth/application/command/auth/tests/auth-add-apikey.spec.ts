/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthAddApiKeyCommand, AuthAddApiKeyCommandImpl, AuthAddApiKeyCommandPayload } from "../auth-add-apikey.command";

describe("AuthAddApiKeyCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let handler: AuthAddApiKeyCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn()
        } as unknown as jest.Mocked<AuthRepository>;

        handler = new AuthAddApiKeyCommandImpl(repository);
    });

    it("should add an API key when auth exists", async () => {
        const payload: AuthAddApiKeyCommandPayload = { authId: "valid-auth-id", apikey: "new-api-key" };
        const mockedAuth = { addApiKey: jest.fn().mockReturnValue(payload.apikey) } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockedAuth);

        const result = await handler.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.authId }] });
        expect(mockedAuth.addApiKey).toHaveBeenCalledWith(payload.apikey);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedAuth);
        expect(result).toBe(payload.apikey);
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        const payload: AuthAddApiKeyCommandPayload = { authId: "invalid-auth-id", apikey: "new-api-key" };
        repository.findOneAsync.mockResolvedValue(null);

        await expect(handler.handleAsync(payload)).rejects.toThrow(AuthNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.authId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
