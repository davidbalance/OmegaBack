import { Management } from "@omega/location/core/domain/management/management.domain";
import { Management as PrismaManagement, Prisma } from "@prisma/client";
import { ManagementDomainMapper } from "../management.domain-mapper";

describe('ManagementDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Management domain object to a Prisma input', () => {
            const domainObj: Management = {
                id: 'id-123',
                name: 'Management'
            } as unknown as Management;

            const expected: Prisma.ManagementUncheckedCreateInput = {
                id: 'id-123',
                name: 'Management'
            }

            const result = ManagementDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Management = {
                id: 'id-123',
                name: 'Management'
            } as unknown as Management;

            const result = ManagementDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Management domain', () => {
            const prismaObj: PrismaManagement = {
                id: 'id-123',
                name: 'Management'
            } as PrismaManagement;

            const expectedDomainObj = { test: 'domain' } as unknown as Management;
            jest.spyOn(Management, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ManagementDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});