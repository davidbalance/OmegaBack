import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { ApiKey as PrismaApiKey, Token as PrismaToken, AuthResource as PrismaAuthResource, Auth as PrismaAuth, Prisma } from "@prisma/client";
import { AuthDomainMapper, PrismaAuthWithApiKeysAndToken } from "../auth.domain-mapper";
import { ApiKeyDomainMapper } from "../api-key.domain-mapper";
import { ApiKey } from "@omega/auth/core/domain/auth/api-key.domain";
import { TokenDomainMapper } from "../token.domain-mapper";
import { Token } from "@omega/auth/core/domain/auth/token.domain";

describe('AuthDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Auth domain object to Prisma input', () => {
            const domainObj: Auth = {
                id: 'auth-1',
                email: 'test@example.com',
                name: 'John',
                lastname: 'Doe',
                password: 'hashedpassword'
            } as unknown as Auth;

            const expected: Prisma.AuthUncheckedCreateInput = {
                id: 'auth-1',
                email: 'test@example.com',
                name: 'John',
                lastname: 'Doe',
                password: 'hashedpassword'
            }

            const result = AuthDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields (id, email, name, lastname, password)', () => {
            const domainObj: Auth = {
                id: 'auth-1',
                email: 'test@example.com',
                name: 'John',
                lastname: 'Doe',
                password: 'hashedpassword'
            } as unknown as Auth;

            const result = AuthDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.email).toBe(domainObj.email);
            expect(result.name).toBe(domainObj.name);
            expect(result.lastname).toBe(domainObj.lastname);
            expect(result.password).toBe(domainObj.password);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaAuthWithApiKeysAndToken = {
            id: 'auth-xyz',
            email: 'user@mail.com',
            name: 'Alice',
            lastname: 'Smith',
            password: 'pw123',
            logoId: 'logo-123',
            apikeys: [{ id: 'key-1' }] as PrismaApiKey[],
            authResource: [{ resourceId: 'res-1' }, { resourceId: 'res-2' }] as PrismaAuthResource[],
            token: { id: 'token-1' } as PrismaToken,
        } as PrismaAuthWithApiKeysAndToken;

        let spyApiKeyDomainMapper;
        let spyTokenDomainMapper;

        beforeEach(() => {
            jest.clearAllMocks();
            spyApiKeyDomainMapper = jest.spyOn(ApiKeyDomainMapper, 'toDomain').mockReturnValue({ mapped: 'apikey' } as unknown as ApiKey);
            spyTokenDomainMapper = jest.spyOn(TokenDomainMapper, 'toDomain').mockReturnValue({ mapped: 'token' } as unknown as Token);
        });

        it('should correctly map a PrismaAuthWithApiKeysAndToken to an Auth domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as Auth;
            jest.spyOn(Auth, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = AuthDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should map apikeys using ApiKeyDomainMapper', () => {
            AuthDomainMapper.toDomain(basePrismaObj);
            expect(spyApiKeyDomainMapper).toHaveBeenCalledTimes(1);
            expect(spyApiKeyDomainMapper).toHaveBeenCalledWith({ id: 'key-1' });
        });

        it('should map token using TokenDomainMapper when token is present', () => {
            AuthDomainMapper.toDomain(basePrismaObj);
            expect(spyTokenDomainMapper).toHaveBeenCalledWith({ id: 'token-1' });
        });

        it('should return null for token if it is undefined or null', () => {
            const expectedDomainObj = { test: 'domain' } as unknown as Auth;
            const spyOnRehydrate = jest.spyOn(Auth, "rehydrate").mockReturnValue(expectedDomainObj);
            const noToken = { ...basePrismaObj, token: null };

            AuthDomainMapper.toDomain(noToken);

            expect(spyTokenDomainMapper).not.toHaveBeenCalled();
            expect(spyOnRehydrate.mock.calls[0][0].token).toBeNull();
        });

        it('should map authResource to resource IDs', () => {
            const expectedDomainObj = { test: 'domain' } as unknown as Auth;
            const spyOnRehydrate = jest.spyOn(Auth, "rehydrate").mockReturnValue(expectedDomainObj);

            AuthDomainMapper.toDomain(basePrismaObj);

            expect(spyOnRehydrate.mock.calls[0][0].resources).toEqual(['res-1', 'res-2']);
        });
    });
});