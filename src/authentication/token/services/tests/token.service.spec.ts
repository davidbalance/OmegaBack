import { TokenService } from "../token.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TestBed } from "@automock/jest";
import { TokenRepository } from "../../repositories/token.repository";
import { mockToken } from "./stub/token.stub";
import { RefreshToken } from "../../types/refresh-token.type";
import { ForbiddenException } from "@nestjs/common";
import { Between } from "typeorm";
import { AuthConfig, AuthConfigName } from "@/shared/config/auth.config";

describe('TokenService', () => {
    let service: TokenService;
    let repository: jest.Mocked<TokenRepository>;
    let jwtService: jest.Mocked<JwtService>;
    let configService: jest.Mocked<ConfigService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(TokenService).compile();

        service = unit;
        repository = unitRef.get(TokenRepository);
        jwtService = unitRef.get(JwtService);
        configService = unitRef.get(ConfigService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('initToken', () => {
        const sub = 1;
        const access = 'test-access-token';
        const refresh = 'test-refresh-token';
        const expiresIn = 3600;

        beforeEach(() => {
            jwtService.sign.mockReturnValueOnce(access);
            jwtService.sign.mockReturnValueOnce(refresh);
            configService.get.mockReturnValueOnce({
                jwt_expires: expiresIn,
                jwt_refresh_expires: expiresIn
            } as AuthConfig);
        });

        it('should generate and store access and refresh tokens', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValueOnce(undefined);

            // Act
            const result = await service.initToken(sub);

            // Assert
            expect(jwtService.sign).toHaveBeenCalledTimes(2);
            expect(configService.get).toHaveBeenCalledWith(AuthConfigName);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ key: sub }, {
                token: access,
                expiresAt: expect.any(Date),
            });
            expect(result).toEqual({ access: access, refresh: refresh, expiresAt: expect.any(Date) });
        });

        it('should create a new token if it does not exist', async () => {
            // Arrange
            repository.findOneAndUpdate.mockRejectedValueOnce(new Error());
            repository.create.mockResolvedValueOnce(undefined);

            // Act
            const result = await service.initToken(sub);

            // Assert
            expect(result).toEqual({
                access: access,
                refresh: refresh,
                expiresAt: expect.any(Date),
            });
            expect(jwtService.sign).toHaveBeenCalledTimes(2);
            expect(configService.get).toHaveBeenCalledWith(AuthConfigName);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ key: sub }, {
                token: access,
                expiresAt: expect.any(Date),
            });
            expect(repository.create).toHaveBeenCalledWith({
                key: sub,
                token: access,
                expiresAt: expect.any(Date),
            });
        });

        it('should create a new token if it does not exist', async () => {
            // Arrange
            repository.findOneAndUpdate.mockRejectedValueOnce(new Error());
            repository.create.mockResolvedValueOnce(undefined);

            // Act
            const result = await service.initToken(sub);

            // Assert
            expect(result).toEqual({
                access: access,
                refresh: refresh,
                expiresAt: expect.any(Date),
            });
            expect(jwtService.sign).toHaveBeenCalledTimes(2);
            expect(configService.get).toHaveBeenCalledWith(AuthConfigName);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ key: sub }, {
                token: access,
                expiresAt: expect.any(Date),
            });
            expect(repository.create).toHaveBeenCalledWith({
                key: sub,
                token: access,
                expiresAt: expect.any(Date),
            });
        });
    });

    describe('refreshToken', () => {
        const sub = 1;
        const access = 'test-access-token';
        const refresh = 'test-refresh-token';
        const expiresIn = 3600;
        const token: RefreshToken = { sub, token: refresh, iat: 1678886400 };
        const mockedToken = mockToken();

        beforeEach(() => {
            jwtService.sign.mockReturnValueOnce(access);
            jwtService.sign.mockReturnValueOnce(refresh);
            configService.get.mockReturnValueOnce({
                jwt_expires: expiresIn,
                jwt_refresh_expires: expiresIn
            } as AuthConfig);
        });

        it('should refresh tokens if the refresh token is valid', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce({ ...mockedToken, token: refresh });
            repository.findOneAndUpdate.mockResolvedValueOnce(undefined);

            // Act
            const result = await service.refreshToken(token);

            // Assert
            expect(result).toEqual({
                access: access,
                refresh: refresh,
                expiresAt: expect.any(Date),
            });
            expect(jwtService.sign).toHaveBeenCalledTimes(2);
            expect(configService.get).toHaveBeenCalledWith(AuthConfigName);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { key: sub } });
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ key: sub }, {
                token: access,
                expiresAt: expect.any(Date),
            });
        });

        it('should throw a ForbiddenException if the refresh token is invalid', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedToken);

            // Act & Assert
            await expect(service.refreshToken(token))
                .rejects
                .toThrowError(ForbiddenException);
            expect(jwtService.sign).not.toHaveBeenCalled();
            expect(repository.findOne).toHaveBeenCalledWith({ where: { key: sub } });
            expect(repository.findOneAndUpdate).not.toHaveBeenCalled();
        });

        it('should delete the token and throw a ForbiddenException if the refresh token is expired and outside the allowed time', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce({ ...mockedToken, token: 'invalid-token' });
            repository.findOneAndDelete.mockResolvedValueOnce(undefined);

            // Act & Assert
            await expect(service.refreshToken(token))
                .rejects
                .toThrowError(ForbiddenException);
            expect(jwtService.sign).not.toHaveBeenCalled();
            expect(repository.findOne).toHaveBeenCalledWith({ where: { key: sub } });
            expect(repository.findOneAndDelete).toHaveBeenCalledWith({ key: sub });
        });
    });

    describe('removeToken', () => {
        const sub = 1;

        it('should delete the token by user ID', async () => {
            // Arrange
            repository.findOneAndDelete.mockResolvedValue(undefined);

            // Act
            await service.removeToken(sub);

            // Assert
            expect(repository.findOneAndDelete).toHaveBeenCalledWith({ key: sub });
        });
    });

    describe('removeExpireToken', () => {
        it('should delete expired tokens', async () => {
            // Arrange
            repository.findOneAndDelete.mockResolvedValue(undefined);

            // Act
            await service.removeExpireToken();

            // Assert
            expect(repository.findOneAndDelete).toHaveBeenCalledWith({
                expiresAt: Between(expect.any(Date), expect.any(Date)),
            });
        });
    });
});