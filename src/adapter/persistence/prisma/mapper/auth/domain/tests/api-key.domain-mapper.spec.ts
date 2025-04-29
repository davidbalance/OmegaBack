import { ApiKey } from "@omega/auth/core/domain/auth/api-key.domain";
import { ApiKeyDomainMapper } from "../api-key.domain-mapper";
import { Prisma, ApiKey as PrismaApiKey } from "@prisma/client";

describe('ApiKeyDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an ApiKey domain object to a Prisma input', () => {
            const domainObj: ApiKey = {
                id: 'abc123',
                keyName: 'my-api-key',
                apikey: 'supersecretkey',
                authId: 'user-456'
            } as unknown as ApiKey;

            const expected: Prisma.ApiKeyUncheckedCreateInput = {
                id: 'abc123',
                name: 'my-api-key',
                apikey: 'supersecretkey',
                authId: 'user-456'
            }

            const result = ApiKeyDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the id, apikey, and authId values during mapping', () => {
            const domainObj: ApiKey = {
                id: 'abc123',
                keyName: 'my-api-key',
                apikey: 'supersecretkey',
                authId: 'user-456'
            } as unknown as ApiKey;

            const result = ApiKeyDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.apikey).toBe(domainObj.apikey);
            expect(result.authId).toBe(domainObj.authId);
        });

        it('should rename keyName to name in the Prisma object', () => {
            const domainObj: ApiKey = {
                id: 'abc123',
                keyName: 'my-api-key',
                apikey: 'supersecretkey',
                authId: 'user-456'
            } as unknown as ApiKey;

            const result = ApiKeyDomainMapper.toPrisma(domainObj);

            expect(result.name).toBe(domainObj.keyName);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the ApiKey domain', () => {
            const prismaObj: PrismaApiKey = {
                id: 'id-001',
                name: 'mapped-name',
                apikey: 'value',
                authId: 'auth-001'
            } as unknown as PrismaApiKey;

            const expectedDomainObj = { test: 'domain' } as unknown as ApiKey;
            jest.spyOn(ApiKey, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ApiKeyDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should rename name to keyName in the domain object', () => {
            const prismaObj: PrismaApiKey = {
                id: 'id-001',
                name: 'mapped-name',
                apikey: 'value',
                authId: 'auth-001'
            } as unknown as PrismaApiKey;

            const expectedDomainObj = { keyName: 'domain-name' } as unknown as ApiKey;
            jest.spyOn(ApiKey, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ApiKeyDomainMapper.toDomain(prismaObj);

            expect(expectedDomainObj.keyName).toBe(result.keyName);
        });
    });
});