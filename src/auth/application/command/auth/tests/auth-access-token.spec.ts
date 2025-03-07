/* eslint-disable @typescript-eslint/unbound-method */
import { AuthGenerateTokenQuery } from "@omega/auth/application/query/auth/auth-generate-token.query";
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthAccessTokenCommand, AuthAccessTokenCommandPayload } from "../auth-access-token.command";

describe("AuthAccessTokenCommand", () => {
    let repository: jest.Mocked<AuthRepository>;
    let generator: jest.Mocked<AuthGenerateTokenQuery>;
    let jwt: jest.Mocked<JwtProvider>;
    let command: AuthAccessTokenCommand;

    beforeEach(() => {
        repository = {
            findOneAsync: jest.fn(),
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        generator = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthGenerateTokenQuery>;

        jwt = {
            createJwt: jest.fn(),
        } as unknown as jest.Mocked<JwtProvider>;

        command = new AuthAccessTokenCommand(repository, generator, jwt);
    });

    it("should generate and save tokens when auth exists", async () => {
        const payload: AuthAccessTokenCommandPayload = { authId: "valid-auth-id" };
        const mockedAuth = { addToken: jest.fn() } as unknown as Auth;
        const accessToken = "new-access-token";
        const refreshToken = "new-refresh-token";

        repository.findOneAsync.mockResolvedValue(mockedAuth);
        generator.handleAsync.mockResolvedValue(accessToken);
        jwt.createJwt.mockReturnValue(refreshToken);

        const result = await command.handleAsync(payload);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.authId }] });
        expect(generator.handleAsync).toHaveBeenCalledWith({ authId: payload.authId });
        expect(jwt.createJwt).toHaveBeenCalledWith({ sub: payload.authId, token: accessToken });
        expect(repository.saveAsync).toHaveBeenCalledWith(mockedAuth);
        expect(result).toEqual({ accessToken, refreshToken });
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        const payload: AuthAccessTokenCommandPayload = { authId: "invalid-auth-id" };
        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync(payload)).rejects.toThrow(AuthNotFoundError);

        expect(repository.findOneAsync).toHaveBeenCalledWith({ filter: [{ field: "id", operator: "eq", value: payload.authId }] });
        expect(generator.handleAsync).not.toHaveBeenCalled();
        expect(jwt.createJwt).not.toHaveBeenCalled();
        expect(repository.saveAsync).not.toHaveBeenCalled();
    });
});
