import { Attribute } from "@omega/profile/core/domain/user/attribute.domain";
import { Attribute as PrismaAttribute, Prisma } from "@prisma/client";
import { AttributeDomainMapper } from "../attribute.domain-mapper";

describe('AttributeDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Attribute domain object to a Prisma input', () => {
            const domainObj: Attribute = {
                id: 'disease-123',
                name: "Attribute",
                value: "sample-value",
                userId: "user-123"
            } as unknown as Attribute;

            const expected: Prisma.AttributeUncheckedCreateInput = {
                id: 'disease-123',
                name: "Attribute",
                value: "sample-value",
                userId: "user-123"
            }

            const result = AttributeDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Attribute = {
                id: 'disease-123',
                name: "Attribute",
                value: "sample-value",
                userId: "user-123"
            } as unknown as Attribute;

            const result = AttributeDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
            expect(result.value).toBe(domainObj.value);
            expect(result.userId).toBe(domainObj.userId);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Attribute domain', () => {
            const prismaObj: PrismaAttribute = {
                id: 'disease-123',
                name: "Attribute",
                value: "sample-value",
                userId: "user-123",
                createdAt: new Date(),
                updatedAt: null
            };

            const expectedDomainObj = { test: 'domain' } as unknown as Attribute;
            jest.spyOn(Attribute, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = AttributeDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});