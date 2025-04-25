/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository } from "@omega/auth/application/repository/auth/aggregate.repositories";
import { AuthRefreshTokenCommand, AuthRefreshTokenCommandImpl } from "../auth-refresh-token.command";
import { AuthGenerateTokenQuery } from "@omega/auth/application/query/auth/auth-generate-token.query";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { TokenUnauthorizeError } from "@omega/auth/core/domain/auth/errors/token.errors";
import { AuthJwtPayload, RefreshJwtPayload } from "@omega/auth/application/type/auth.type";

describe('AuthRefreshTokenCommand', () => {
    let command: AuthRefreshTokenCommand;
    let repository: jest.Mocked<AuthRepository>;
    let generator: jest.Mocked<AuthGenerateTokenQuery>;
    let accessJwt: jest.Mocked<JwtProvider>;
    let refreshJwt: jest.Mocked<JwtProvider>;

    beforeEach(() => {
        repository = { findOneAsync: jest.fn(), saveAsync: jest.fn() } as unknown as jest.Mocked<AuthRepository>;
        generator = { handleAsync: jest.fn() } as unknown as jest.Mocked<AuthGenerateTokenQuery>;
        accessJwt = { validateJwt: jest.fn() } as unknown as jest.Mocked<JwtProvider>;
        refreshJwt = { validateJwt: jest.fn(), createJwt: jest.fn() } as unknown as jest.Mocked<JwtProvider>;

        command = new AuthRefreshTokenCommandImpl(repository, generator, accessJwt, refreshJwt);
    });

    it('should refresh tokens successfully', async () => {
        const mockAuth = { refreshToken: jest.fn() } as unknown as Auth;
        const mockRefresh: RefreshJwtPayload = { sub: 'user1', token: 'accessJwt' } as unknown as RefreshJwtPayload;
        const mockAccess: AuthJwtPayload = { sub: 'user1', token: 'accessJwt' } as unknown as AuthJwtPayload;

        refreshJwt.validateJwt.mockReturnValue(mockRefresh);
        refreshJwt.createJwt.mockReturnValue('newRefreshToken');
        accessJwt.validateJwt.mockReturnValue(mockAccess);
        repository.findOneAsync.mockResolvedValue(mockAuth);
        generator.handleAsync.mockResolvedValue('newAccessToken');

        const result = await command.handleAsync({ jwt: 'refreshToken' });

        expect(repository.saveAsync).toHaveBeenCalled();
        expect(result).toEqual({ accessToken: 'newAccessToken', refreshToken: 'newRefreshToken' });
    });

    it('should throw an error if the refresh token is invalid', async () => {
        refreshJwt.validateJwt.mockImplementation(() => { throw new TokenUnauthorizeError(); });

        await expect(command.handleAsync({ jwt: 'invalidToken' })).rejects.toThrow(TokenUnauthorizeError);
    });

    it('should throw an error if the access token inside refresh token is invalid', async () => {
        refreshJwt.validateJwt.mockReturnValue({ sub: 'user1', token: 'invalidAccess' });
        accessJwt.validateJwt.mockImplementation(() => { throw new TokenUnauthorizeError(); });

        await expect(command.handleAsync({ jwt: 'refreshToken' })).rejects.toThrow(TokenUnauthorizeError);
    });

    it('should throw an error if subject mismatch occurs between tokens', async () => {
        refreshJwt.validateJwt.mockReturnValue({ sub: 'user1', token: 'accessJwt' });
        accessJwt.validateJwt.mockReturnValue({ sub: 'user2' });

        await expect(command.handleAsync({ jwt: 'refreshToken' })).rejects.toThrow(TokenUnauthorizeError);
    });

    it('should throw an error if the user is not found in the repository', async () => {
        refreshJwt.validateJwt.mockReturnValue({ sub: 'user1', token: 'accessJwt' });
        accessJwt.validateJwt.mockReturnValue({ sub: 'user1' });
        repository.findOneAsync.mockResolvedValue(null);

        await expect(command.handleAsync({ jwt: 'refreshToken' })).rejects.toThrow(TokenUnauthorizeError);
    });
});
