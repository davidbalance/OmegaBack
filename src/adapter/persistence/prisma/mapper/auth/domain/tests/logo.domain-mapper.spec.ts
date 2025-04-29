import { Logo } from "@omega/auth/core/domain/logo/logo.domain";
import { Prisma, Logo as PrismaLogo } from "@prisma/client";
import { LogoDomainMapper } from "../logo.domain-mapper";

describe('LogoDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Logo domain object to a Prisma input', () => {
            const domainObj: Logo = {
                id: 'logo-123',
                name: 'logo-123'
            } as unknown as Logo;

            const expected: Prisma.LogoUncheckedCreateInput = {
                id: 'logo-123',
                name: 'logo-123'
            }

            const result = LogoDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the id, and name values during mapping', () => {
            const domainObj: Logo = {
                id: 'logo-123',
                name: 'logo-123'
            } as unknown as Logo;

            const result = LogoDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Logo domain', () => {
            const prismaObj: PrismaLogo = {
                id: 'logo-789',
                name: 'logo-789'
            } as unknown as PrismaLogo;

            const expectedDomainObj = { test: 'domain' } as unknown as Logo;
            jest.spyOn(Logo, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = LogoDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});