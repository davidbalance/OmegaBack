/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthAddTokenCommand, AuthAddTokenCommandImpl, AuthAddTokenCommandPayload } from "../auth-add-token.command";

describe("AuthAddTokenCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let command: AuthAddTokenCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        command = new AuthAddTokenCommandImpl(repository);
    });

    it("should add token when auth exists", async () => {
        const payload: AuthAddTokenCommandPayload = { authId: "valid-auth-id", token: "new-token" };
        const mockedAuth = { addToken: jest.fn() } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockedAuth);

        await command.handleAsync(payload);

        expect(mockedAuth.addToken).toHaveBeenCalledWith("new-token");
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedAuth);
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        const payload: AuthAddTokenCommandPayload = { authId: "invalid-auth-id", token: "new-token" };
        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(new AuthNotFoundError(payload.authId));

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.authId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
