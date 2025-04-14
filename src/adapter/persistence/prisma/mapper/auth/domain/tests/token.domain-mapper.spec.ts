import { Token } from "@omega/auth/core/domain/auth/token.domain";
import { Prisma, Token as PrismaToken } from "@prisma/client";
import { TokenDomainMapper } from "../token.domain-mapper";

describe('TokenDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Token domain object to a Prisma input', () => {
            const domainObj: Token = {
                id: 'id-123',
                token: 'Address123, Maple Street',
                authId: 'auth-123',
            } as unknown as Token;

            const expected: Prisma.TokenUncheckedCreateInput = {
                id: 'id-123',
                token: 'Address123, Maple Street',
                authId: 'auth-123',
            }

            const result = TokenDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Token = {
                id: 'id-123',
                address: 'Address123, Maple Street',
                icon: 'test',
                label: 'Test resource',
                hidden: true,
                order: 1,
            } as unknown as Token;

            const result = TokenDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.token).toBe(domainObj.token);
            expect(result.authId).toBe(domainObj.authId);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Token domain', () => {
            const prismaObj: PrismaToken = {
                id: 'id-123',
                token: 'Address123, Maple Street',
                authId: 'auth-123',
            } as unknown as PrismaToken;

            const expectedDomainObj = { test: 'domain' } as unknown as Token;
            jest.spyOn(Token, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = TokenDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});