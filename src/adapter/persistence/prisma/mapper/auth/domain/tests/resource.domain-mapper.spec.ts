import { Resource } from "@omega/auth/core/domain/resource/resource.domain";
import { Resource as PrismaResource, Prisma } from "@prisma/client";
import { ResourceDomainMapper } from "../resource.domain-mapper";

describe('ResourceDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Resource domain object to a Prisma input', () => {
            const domainObj: Resource = {
                id: 'id-123',
                address: 'Address123, Maple Street',
                icon: 'test',
                label: 'Test resource',
                hidden: true,
                order: 1,
            } as unknown as Resource;

            const expected: Prisma.ResourceUncheckedCreateInput = {
                id: 'id-123',
                address: 'Address123, Maple Street',
                icon: 'test',
                label: 'Test resource',
                hidden: true,
                order: 1,
            }

            const result = ResourceDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Resource = {
                id: 'id-123',
                address: 'Address123, Maple Street',
                icon: 'test',
                label: 'Test resource',
                hidden: true,
                order: 1,
            } as unknown as Resource;

            const result = ResourceDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.address).toBe(domainObj.address);
            expect(result.icon).toBe(domainObj.icon);
            expect(result.label).toBe(domainObj.label);
            expect(result.hidden).toBe(domainObj.hidden);
            expect(result.order).toBe(domainObj.order);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Resource domain', () => {
            const prismaObj: PrismaResource = {
                id: 'id-123',
                address: 'Address123, Maple Street',
                icon: 'test',
                label: 'Test resource',
                hidden: true,
                order: 1,
            } as unknown as PrismaResource;

            const expectedDomainObj = { test: 'domain' } as unknown as Resource;
            jest.spyOn(Resource, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ResourceDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});