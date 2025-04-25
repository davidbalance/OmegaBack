/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthRemoveTokenCommand, AuthRemoveTokenCommandImpl } from "../auth-remove-token.command";

describe("AuthRemoveTokenCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let jwt: jest.Mocked<JwtProvider>;
    let command: AuthRemoveTokenCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        jwt = {
            validateJwt: jest.fn(),
        } as unknown as jest.Mocked<JwtProvider>;

        command = new AuthRemoveTokenCommandImpl(repository, jwt);
    });

    it("should remove the token when auth exists and token is valid", async () => {
        const mockAuth = {
            removeToken: jest.fn(),
        } as unknown as Auth;

        const payload = { sub: "auth-1" };
        const token = "valid-token";

        jwt.validateJwt.mockReturnValue(payload);
        repository.findOneAsync.mockResolvedValue(mockAuth);
        repository.saveAsync.mockResolvedValue();

        await command.handleAsync({ token });

        expect(jwt.validateJwt).toHaveBeenCalledWith(token);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.sub }],
        });
        expect(mockAuth.removeToken).toHaveBeenCalledWith(token);
        expect(repository.saveAsync).toHaveBeenCalledWith(mockAuth);
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        const payload = { sub: "auth-1" };
        const token = "valid-token";

        jwt.validateJwt.mockReturnValue(payload);
        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync({ token })).rejects.toThrow(AuthNotFoundError);

        expect(jwt.validateJwt).toHaveBeenCalledWith(token);
        expect(repository.findOneAsync).toHaveBeenCalledWith({
            filter: [{ field: "id", operator: "eq", value: payload.sub }],
        });
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
