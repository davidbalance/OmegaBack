import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthProxyService } from "./auth-proxy.service";
import { TestingModule, Test } from "@nestjs/testing";
import { AuthAddLogoCommand } from "@omega/auth/application/command/auth/auth-add-logo.command";
import { AuthAddResourcesCommand } from "@omega/auth/application/command/auth/auth-add-resources.command";
import { AuthCreateCommand } from "@omega/auth/application/command/auth/auth-create.command";
import { AuthFindManyResourcesQuery } from "@omega/auth/application/query/auth/auth-find-many-resources.query";
import { UserFindOneByAuthQuery } from "@omega/profile/application/query/user/user-find-one-by-auth.query";
import { AuthAddLogoCommandToken, AuthAddResourcesCommandToken, AuthCreateCommandToken } from "@omega/auth/nest/inject/command.inject";
import { AuthFindManyResourcesQueryToken } from "@omega/auth/nest/inject/query.inject";
import { JwtAccessProviderToken } from "@shared/shared/nest/inject";
import { UserFindOneByAuthQueryToken } from "@omega/profile/nest/inject/query.inject";
import { AuthResourceModel } from "@omega/auth/core/model/auth/auth-resource.model";
import { AuthPayload, AuthResourcePayload, CreateAuthPayload } from "@shared/shared/providers/auth.provider";
import { AuthJwtPayload } from "@omega/auth/application/type/auth.type";
import { UserModel } from "@omega/profile/core/model/user/user.model";
import { Logger } from "@nestjs/common";
import { InternalError } from "@shared/shared/domain/error";

describe("AuthProxyService", () => {
    let service: AuthProxyService;
    let createCommand: jest.Mocked<AuthCreateCommand>;
    let addLogoCommand: jest.Mocked<AuthAddLogoCommand>;
    let addResourcesCommand: jest.Mocked<AuthAddResourcesCommand>;
    let authResourcesFindMany: jest.Mocked<AuthFindManyResourcesQuery>;
    let findOneUser: jest.Mocked<UserFindOneByAuthQuery>;
    let jwt: jest.Mocked<JwtProvider>;

    beforeEach(async () => {
        createCommand = {
            handleAsync: jest.fn()
        } as unknown as jest.Mocked<AuthCreateCommand>;

        addLogoCommand = {
            handleAsync: jest.fn()
        } as unknown as jest.Mocked<AuthAddLogoCommand>;

        addResourcesCommand = {
            handleAsync: jest.fn()
        } as unknown as jest.Mocked<AuthAddResourcesCommand>;

        authResourcesFindMany = {
            handleAsync: jest.fn()
        } as unknown as jest.Mocked<AuthFindManyResourcesQuery>;

        findOneUser = {
            handleAsync: jest.fn()
        } as unknown as jest.Mocked<UserFindOneByAuthQuery>;

        jwt = {
            validateJwt: jest.fn()
        } as unknown as jest.Mocked<JwtProvider>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthProxyService,
                { provide: AuthCreateCommandToken, useValue: createCommand },
                { provide: AuthAddLogoCommandToken, useValue: addLogoCommand },
                { provide: AuthAddResourcesCommandToken, useValue: addResourcesCommand },
                { provide: AuthFindManyResourcesQueryToken, useValue: authResourcesFindMany },
                { provide: UserFindOneByAuthQueryToken, useValue: findOneUser },
                { provide: JwtAccessProviderToken, useValue: jwt },
            ]
        }).compile();

        service = module.get<AuthProxyService>(AuthProxyService);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('addLogo', () => {
        it('should call addLogoCommand.handleAsync with correct params', async () => {
            await service.addLogo('auth123', 'logo456');
            expect(addLogoCommand.handleAsync).toHaveBeenCalledWith({ authId: 'auth123', logoId: 'logo456' });
        });

    });

    describe('retriveResources', () => {
        const mockedResources = [
            { resourceId: 'res1', resourceLabel: 'Label1', resourceIcon: 'icon1' },
            { resourceId: 'res2', resourceLabel: 'Label2', resourceIcon: 'icon2' }
        ] as unknown as AuthResourceModel[];


        it('should call authResourcesFindMany.handleAsync with correct parameters', async () => {
            authResourcesFindMany.handleAsync.mockResolvedValue(mockedResources);

            await service.retriveResources('authId123');

            expect(authResourcesFindMany.handleAsync).toHaveBeenCalledWith({ authId: 'authId123' });
        });


        it('should return mapped auth resources from retriveResources', async () => {
            authResourcesFindMany.handleAsync.mockResolvedValue(mockedResources);

            const result = await service.retriveResources('authId123');

            expect(result).toEqual(mockedResources);
        });

    });

    describe('addResources', () => {
        const value: AuthResourcePayload = { authId: 'auth789', resources: ['r1', 'r2'] }

        it('should call addResourcesCommand.handleAsync with correct params', async () => {
            await service.addResources(value);

            expect(addResourcesCommand.handleAsync).toHaveBeenCalledWith({
                authId: value.authId,
                resourceIds: value.resources
            });
        });
    });

    describe('createAuth', () => {
        const value: CreateAuthPayload = {
            name: "Test user",
            lastname: "Lastname",
            email: "test@email.com",
            password: "test@123"
        }
        const mockedAuth = 'new-auth-id';

        it('should call authResourcesFindMany.handleAsync with correct parameters', async () => {
            createCommand.handleAsync.mockResolvedValue(mockedAuth);

            await service.createAuth(value);

            expect(createCommand.handleAsync).toHaveBeenCalledWith(value);
        });

        it('should return string from createAuth', async () => {
            createCommand.handleAsync.mockResolvedValue(mockedAuth);

            const result = await service.createAuth(value);

            expect(result).toEqual(mockedAuth);
        });
    });

    describe('validateJwt', () => {
        const mockAuthJwt: AuthJwtPayload = {
            sub: "auth-sub-123",
            email: "test@email.com",
            name: "Test",
            lastname: "Lastname",
            logo: null,
            resources: []
        }
        const mockUser: UserModel = {
            userDni: '0123456789',
            email: 'test@email.com',
            userId: 'user-id-123',
            userLastname: 'Lastname',
            userName: 'Test',
        } as unknown as UserModel;

        const jwtValue: string = 'jwt-token';

        const expectValue: AuthPayload = {
            dni: mockUser.userDni,
            email: mockAuthJwt.email,
            id: mockUser.userId,
            lastname: mockUser.userLastname,
            name: mockUser.userName
        }

        it('should return AuthPayload from validateJwt', async () => {
            jwt.validateJwt.mockReturnValue(mockAuthJwt);
            findOneUser.handleAsync.mockResolvedValue(mockUser);

            const result = await service.validateJwt(jwtValue);

            expect(jwt.validateJwt).toHaveBeenCalledWith(jwtValue);
            expect(findOneUser.handleAsync).toHaveBeenCalledWith({ authId: mockAuthJwt.sub });
            expect(result).toEqual(expectValue);
        });

        it('should throw InternalError if validateJwt fails', async () => {
            jwt.validateJwt.mockImplementation(() => {
                throw new Error('JWT error');
            });

            jest.spyOn(Logger, 'error').mockImplementation(() => { });

            await expect(service.validateJwt('invalid-token')).rejects.toThrow(InternalError);
        });
    });
});