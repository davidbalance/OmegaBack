/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthAddLogoCommand, AuthAddLogoCommandPayload } from "../auth-add-logo.command";

describe("AuthAddLogoCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let command: AuthAddLogoCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        command = new AuthAddLogoCommand(repository);
    });

    it("should add a logo when auth exists", async () => {
        const payload: AuthAddLogoCommandPayload = { authId: "valid-auth-id", logoId: "new-logo-id" };
        const mockedAuth = {
            addLogo: jest.fn()
        } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockedAuth);

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.authId }] });
        expect(mockedAuth.addLogo).toHaveBeenCalledWith(payload.logoId);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedAuth);
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        const payload: AuthAddLogoCommandPayload = { authId: "invalid-auth-id", logoId: "new-logo-id" };
        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(AuthNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.authId }] });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });

    it("should save the auth entity after adding logo", async () => {
        const payload: AuthAddLogoCommandPayload = { authId: "valid-auth-id", logoId: "new-logo-id" };
        const mockedAuth = {
            addLogo: jest.fn()
        } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockedAuth);

        await command.handleAsync(payload);

        expect(repository.saveAsync).toHaveBeenCalledWith(mockedAuth);
    });
});
