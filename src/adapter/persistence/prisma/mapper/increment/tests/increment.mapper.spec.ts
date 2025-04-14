import { IncrementDomain } from "@local-increment/local-increment/domain/increment.domain";
import { Prisma, Increment as PrismaIncrement } from "@prisma/client";
import { IncrementDomainMapper } from "../increment.mapper";

describe('IncrementDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an IncrementDomain domain object to a Prisma input', () => {
            const domainObj: IncrementDomain = {
                id: 'increment-123',
                key: 'key-123',
                count: 1
            } as unknown as IncrementDomain;

            const expected: Prisma.IncrementUncheckedCreateInput = {
                id: 'increment-123',
                key: 'key-123',
                count: 1
            }

            const result = IncrementDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: IncrementDomain = {
                id: 'increment-123',
                key: 'key-123',
                count: 1
            } as unknown as IncrementDomain;

            const result = IncrementDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.key).toBe(domainObj.key);
            expect(result.count).toBe(domainObj.count);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the IncrementDomain domain', () => {
            const prismaObj: PrismaIncrement = {
                id: 'increment-123',
                key: 'key-123',
                count: 1
            } as PrismaIncrement;

            const expectedDomainObj = { test: 'domain' } as unknown as IncrementDomain;
            jest.spyOn(IncrementDomain, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = IncrementDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});