import { TokenService } from "../token.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TestBed } from "@automock/jest";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { TokenRepository } from "../../repositories/token.repository";
import dayjs from "dayjs";
import { Between } from "typeorm";

describe('TokenService', () => {
    let service: TokenService;
    let repository: jest.Mocked<TokenRepository>;
    let jwt: jest.Mocked<JwtService>;
    let config: jest.Mocked<ConfigService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(TokenService).compile();

        service = unit;
        repository = unitRef.get(TokenRepository);
        jwt = unitRef.get(JwtService);
        config = unitRef.get(ConfigService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('initToken', () => {
        it('should generate and store tokens', async () => {
            const sub = 1;
            const access = 'accessToken';
            const refresh = 'refreshToken';
            const expiresRefresh = new Date();
            const tokenPayload = { access, refresh, expiresAt: expiresRefresh };

            jest.spyOn<any, any>(service, 'generateToken').mockResolvedValue({ access, refresh });
            jest.spyOn<any, any>(service, 'getExpiresTime').mockReturnValue({ expiresAccess: new Date(), expiresRefresh });
            jest.spyOn<any, any>(service, 'storeToken').mockResolvedValue(undefined);

            const result = await service.initToken(sub);

            expect(result).toEqual(tokenPayload);
            expect(service['generateToken']).toHaveBeenCalledWith(sub);
            expect(service['storeToken']).toHaveBeenCalledWith(sub, access);
        });
    });

    describe('refreshToken', () => {
        it('should refresh tokens if the refresh token is valid', async () => {
            const payload = { sub: 1, token: 'refreshToken', iat: dayjs().unix() };
            const access = 'newAccessToken';
            const refresh = 'newRefreshToken';
            const expiresRefresh = new Date();
            const tokenPayload = { access, refresh, expiresAt: expiresRefresh };

            jest.spyOn<any, any>(service, 'canRefresh').mockResolvedValue(true);
            jest.spyOn<any, any>(service, 'generateToken').mockResolvedValue({ access, refresh });
            jest.spyOn<any, any>(service, 'getExpiresTime').mockReturnValue({ expiresAccess: new Date(), expiresRefresh });
            jest.spyOn<any, any>(service, 'storeToken').mockResolvedValue(undefined);

            const result = await service.refreshToken(payload);

            expect(result).toEqual(tokenPayload);
            expect(service['canRefresh']).toHaveBeenCalledWith(payload);
            expect(service['generateToken']).toHaveBeenCalledWith(payload.sub);
            expect(service['storeToken']).toHaveBeenCalledWith(payload.sub, access);
        });

        it('should throw ForbiddenException if the refresh token is invalid', async () => {
            const payload = { sub: 1, token: 'invalidToken', iat: dayjs().unix() };

            jest.spyOn<any, any>(service, 'canRefresh').mockResolvedValue(false);

            await expect(service['refreshToken'](payload)).rejects.toThrow(ForbiddenException);
            expect(service['canRefresh']).toHaveBeenCalledWith(payload);
        });
    });

    describe('removeToken', () => {
        it('should delete the token associated with the given sub', async () => {
            const sub = 1;

            await service.removeToken(sub);

            expect(repository.findOneAndDelete).toHaveBeenCalledWith({ key: sub });
        });
    });

    describe('removeExpireToken', () => {
        it('should delete expired tokens', async () => {

            await service.removeExpireToken();

            expect(repository.findOneAndDelete).toHaveBeenCalledTimes(1);
        });
    });
});