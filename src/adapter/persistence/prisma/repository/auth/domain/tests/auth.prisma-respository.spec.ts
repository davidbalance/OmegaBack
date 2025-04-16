import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { AuthPrismaRepository } from "../auth.prisma-respository";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthDomainMapper } from "@omega/adapter/persistence/prisma/mapper/auth/domain/auth.domain-mapper";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { Auth, AuthProps } from "@omega/auth/core/domain/auth/auth.domain";
import { RepositoryError } from "@shared/shared/domain/error";
import { AuthApikeyRemovedEventPayload, AuthIsEvent, AuthLogoAddedEventPayload, AuthPasswordEditedEventPayload, AuthResourceAddedEventPayload, AuthResourceRemovedEventPayload, AuthTokenRemovedEventPayload } from "@omega/auth/core/domain/auth/events/auth.events";
import { ApiKeyDomainMapper } from "@omega/adapter/persistence/prisma/mapper/auth/domain/api-key.domain-mapper";
import { ApiKey } from "@omega/auth/core/domain/auth/api-key.domain";
import { Prisma } from "@prisma/client";
import { Token } from "@omega/auth/core/domain/auth/token.domain";
import { TokenDomainMapper } from "@omega/adapter/persistence/prisma/mapper/auth/domain/token.domain-mapper";
import { Logger } from "@nestjs/common";

describe("AuthPrismaRepository", () => {
    let repository: AuthPrismaRepository;
    let prisma: { auth: any; token: any; apiKey: any; authResource: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        prisma = {
            auth: {
                findFirst: jest.fn(),
                update: jest.fn(),
                create: jest.fn()
            },
            apiKey: { create: jest.fn(), delete: jest.fn() },
            token: { create: jest.fn(), delete: jest.fn() },
            authResource: { create: jest.fn(), delete: jest.fn() },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<AuthPrismaRepository>(AuthPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<AuthProps> = { filter: [{ field: "email", operator: "eq", value: "test@mail.com" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "auth-1" };
            const domainResult = { id: "auth-1" };

            prisma.auth.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(AuthDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.auth.findFirst).toHaveBeenCalledWith({
                include: { apikeys: true, authResource: true, token: true },
                where: mockPrismaWhere,
            });
            expect(AuthDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.auth.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.auth.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): Auth => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as Auth);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(AuthIsEvent, "isAuthPasswordEditedEvent").mockReturnValue(false);
            jest.spyOn(AuthIsEvent, "isAuthApikeyAddedEvent").mockReturnValue(false);
            jest.spyOn(AuthIsEvent, "isAuthApikeyRemovedEvent").mockReturnValue(false);
            jest.spyOn(AuthIsEvent, "isAuthTokenAddedEvent").mockReturnValue(false);
            jest.spyOn(AuthIsEvent, "isAuthTokenRemovedEvent").mockReturnValue(false);
            jest.spyOn(AuthIsEvent, "isAuthResourceAddedEvent").mockReturnValue(false);
            jest.spyOn(AuthIsEvent, "isAuthResourceRemovedEvent").mockReturnValue(false);
            jest.spyOn(AuthIsEvent, "isAuthLogoAddedEvent").mockReturnValue(false);
        });

        it("should call createAuth when event is AuthCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "AuthCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createAuth").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call editPassword when event is AuthEditedEvent", async () => {
            const payload = { authId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "AuthPasswordEditedEvent", value: payload });

            jest.spyOn(AuthIsEvent, "isAuthPasswordEditedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "editPassword").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addApikey when event is AuthApikeyAddedEvent", async () => {
            const payload = { id: "apikey-1" };
            const aggregate = createFakeAggregate({ key: "AuthApikeyAddedEvent", value: payload });

            jest.spyOn(AuthIsEvent, "isAuthApikeyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addApikey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeApikey when event is AuthApikeyRemovedEvent", async () => {
            const payload = { apikeyId: "apikey-1" };
            const aggregate = createFakeAggregate({ key: "AuthApikeyRemovedEvent", value: payload });

            jest.spyOn(AuthIsEvent, "isAuthApikeyRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeApikey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addToken when event is AuthTokenAddedEvent", async () => {
            const payload = { id: "token-1" };
            const aggregate = createFakeAggregate({ key: "AuthTokenAddedEvent", value: payload });

            jest.spyOn(AuthIsEvent, "isAuthTokenAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addToken").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeToken when event is AuthTokenRemovedEvent", async () => {
            const payload = { tokenId: "token-1" };
            const aggregate = createFakeAggregate({ key: "AuthTokenRemovedEvent", value: payload });

            jest.spyOn(AuthIsEvent, "isAuthTokenRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeToken").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addResource when event is AuthResourceAddedEvent", async () => {
            const payload = { authId: "auth-1", resourceId: "resource-1" };
            const aggregate = createFakeAggregate({ key: "AuthResourceAddedEvent", value: payload });

            jest.spyOn(AuthIsEvent, "isAuthResourceAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addResource").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeResource when event is AuthResourceRemovedEvent", async () => {
            const payload = { authId: "auth-1", resourceId: "resource-1" };
            const aggregate = createFakeAggregate({ key: "AuthResourceRemovedEvent", value: payload });

            jest.spyOn(AuthIsEvent, "isAuthResourceRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeResource").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addLogo when event is AuthLogoAddedEvent", async () => {
            const payload = { authId: "auth-1", logoId: "logo-1" };
            const aggregate = createFakeAggregate({ key: "AuthLogoAddedEvent", value: payload });

            jest.spyOn(AuthIsEvent, "isAuthLogoAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addLogo").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createAuth", () => {
            const value = {} as unknown as Auth;
            const mapped: Prisma.AuthUncheckedCreateInput = {
                email: "test@email.com",
                name: "Auth",
                lastname: "Lastname",
                password: "TestPassword123"
            };

            it("should create a new aggregate using the mapped Prisma data", async () => {
                jest.spyOn(AuthDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createAuth(value);

                expect(AuthDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.auth.create).toHaveBeenCalledWith({ data: mapped });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.auth.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(AuthDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createAuth(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("editPassword", () => {
            const value: AuthPasswordEditedEventPayload = {
                authId: "auth-123",
                password: "new-password-hash",
            };

            it("should update the password for the given authId", async () => {
                await repository.editPassword(value);

                expect(prisma.auth.update).toHaveBeenCalledWith({
                    where: { id: value.authId },
                    data: { password: value.password },
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.auth.update.mockRejectedValue(new Error("fail"));

                await expect(repository.editPassword(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("addApikey", () => {
            const value = { id: "key1", authId: "auth1" } as unknown as ApiKey;

            it("should create a new API key", async () => {
                const prismaValue = { some: "mapped-value" } as unknown as Prisma.ApiKeyUncheckedCreateInput;

                jest.spyOn(ApiKeyDomainMapper, "toPrisma").mockReturnValue(prismaValue);
                await repository.addApikey(value);

                expect(prisma.apiKey.create).toHaveBeenCalledWith({ data: prismaValue });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.apiKey.create.mockRejectedValue(new Error("DB fail"));

                await expect(repository.addApikey(value))
                    .rejects
                    .toThrow(RepositoryError);
            });
        });

        describe("removeApikey", () => {
            const value: AuthApikeyRemovedEventPayload = { apikeyId: "apikey-123" };

            it("should delete the API key by id", async () => {
                await repository.removeApikey(value);

                expect(prisma.apiKey.delete).toHaveBeenCalledWith({
                    where: { id: value.apikeyId },
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.apiKey.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeApikey(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("addToken", () => {
            const value = { token: "abc", authId: "auth-1" } as unknown as Token;

            it("should create a new token using the mapped Prisma data", async () => {
                const mapped = { token: "abc", authId: "auth-1" };

                jest.spyOn(TokenDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.addToken(value);

                expect(TokenDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.token.create).toHaveBeenCalledWith({ data: mapped });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.token.create.mockRejectedValue(new Error("fail"));

                jest.spyOn(TokenDomainMapper, "toPrisma").mockReturnValue({ token: "abc", authId: "auth-1" });

                await expect(repository.addToken(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeToken", () => {
            const value: AuthTokenRemovedEventPayload = { tokenId: "token-123" };

            it("should delete the token by id", async () => {
                await repository.removeToken(value);

                expect(prisma.token.delete).toHaveBeenCalledWith({
                    where: { id: value.tokenId },
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.token.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeToken(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("addResource", () => {
            const value: AuthResourceAddedEventPayload = {
                authId: "auth-1",
                resourceId: "resource-1",
            };

            it("should create a new auth resource entry", async () => {
                await repository.addResource(value);

                expect(prisma.authResource.create).toHaveBeenCalledWith({
                    data: {
                        authId: value.authId,
                        resourceId: value.resourceId,
                    },
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.authResource.create.mockRejectedValue(new Error("oops"));

                await expect(repository.addResource(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeResource", () => {
            const value: AuthResourceRemovedEventPayload = {
                authId: "auth-1",
                resourceId: "res-99",
            };

            it("should delete the auth resource using composite key", async () => {
                await repository.removeResource(value);

                expect(prisma.authResource.delete).toHaveBeenCalledWith({
                    where: {
                        authId_resourceId: {
                            authId: value.authId,
                            resourceId: value.resourceId,
                        },
                    },
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.authResource.delete.mockRejectedValue(new Error("fail"));

                await expect(repository.removeResource(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("addLogo", () => {
            const value: AuthLogoAddedEventPayload = {
                authId: "auth-42",
                logoId: "logo-42",
            };

            it("should update the logoId of the auth", async () => {
                await repository.addLogo(value);

                expect(prisma.auth.update).toHaveBeenCalledWith({
                    where: { id: value.authId },
                    data: { logoId: value.logoId },
                });
            });

            it("should throw RepositoryError if prisma throws", async () => {
                prisma.auth.update.mockRejectedValue(new Error("error"));

                await expect(repository.addLogo(value)).rejects.toThrow(RepositoryError);
            });
        });

    });
});