/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthRemoveResourceCommand, AuthRemoveResourceCommandPayload } from "../auth-remove-resource.command";

describe("AuthRemoveResourceCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let command: AuthRemoveResourceCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        command = new AuthRemoveResourceCommand(repository);
    });

    it("should remove the resource when auth exists", async () => {
        const mockAuth = {
            removeResource: jest.fn(),
        } as unknown as Auth;

        repository.findOneAsync.mockResolvedValue(mockAuth);
        repository.saveAsync.mockResolvedValue();

        const payload: AuthRemoveResourceCommandPayload = {
            authId: "auth-1",
            accessId: "resource-1",
        };

        await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.authId }],
        });
        expect(mockAuth.removeResource).toHaveBeenCalledWith(payload.accessId);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockAuth);
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        repository.findOneAsync.mockResolvedValue(null);

        const payload: AuthRemoveResourceCommandPayload = {
            authId: "auth-1",
            accessId: "resource-1",
        };

        await expect(command.handleAsync(payload)).rejects.toThrow(AuthNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.authId }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
