import { TestBed } from "@automock/jest";
import { AuthenticationController } from "./authentication.controller";
import { TokenPayload, TokenService } from "./token/services/token.service";
import { RefreshToken } from "./token/types/refresh-token.type";
import dayjs from "dayjs";

describe('AuthenticationController', () => {
    let controller: AuthenticationController;
    let tokenService: jest.Mocked<TokenService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(AuthenticationController).compile();

        controller = unit;
        tokenService = unitRef.get(TokenService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        const user = 1;
        const mockedToken: TokenPayload = {
            access: "test-access-token",
            refresh: "test-refresh-token",
            expiresAt: new Date()
        }

        it('should call tokenService.initToken and return authentication response', async () => {
            // Arrange
            const expectedResponse = {
                access: 'test-access-token',
                refresh: 'test-refresh-token',
                expiresAt: expect.any(Date)
            }
            tokenService.initToken.mockResolvedValueOnce(mockedToken);

            // Act
            const result = await controller.login(user);

            // Assert
            expect(tokenService.initToken).toHaveBeenCalledWith(user);
            expect(result).toEqual(expectedResponse);
        });
    });

    describe('refresh', () => {
        const mockedToken: TokenPayload = {
            access: "test-access-token",
            refresh: "test-refresh-token",
            expiresAt: new Date()
        };
        const token: RefreshToken = {
            sub: 0,
            token: 'test-refresh-token',
            iat: dayjs().unix()
        };

        it('should call tokenService.refreshToken and return authentication response', async () => {
            // Arrange
            const expectedResponse = {
                access: 'test-access-token',
                refresh: 'test-refresh-token',
                expiresAt: expect.any(Date)
            }
            tokenService.refreshToken.mockResolvedValueOnce(mockedToken);

            // Act
            const result = await controller.refresh(token);

            // Assert
            expect(tokenService.refreshToken).toHaveBeenCalledWith(token);
            expect(result).toEqual(expectedResponse);
        });
    });

    describe('logout', () => {
        const user = 1;

        it('should call tokenService.removeToken and return empty object', async () => {
            // Arrange
            tokenService.removeToken.mockResolvedValue(undefined);

            // Act
            const result = await controller.logout(user);

            // Assert
            expect(tokenService.removeToken).toHaveBeenCalledWith(user);
            expect(result).toEqual({});
        });
    });
});