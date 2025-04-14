import { Area } from "@omega/location/core/domain/area/area.domain";
import { Area as PrismaArea, Prisma } from "@prisma/client";
import { AreaDomainMapper } from "../area.domain-mapper";

describe('AreaDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Area domain object to a Prisma input', () => {
            const domainObj: Area = {
                id: 'id-123',
                name: 'Area'
            } as unknown as Area;

            const expected: Prisma.AreaUncheckedCreateInput = {
                id: 'id-123',
                name: 'Area'
            }

            const result = AreaDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Area = {
                id: 'id-123',
                name: 'Area'
            } as unknown as Area;

            const result = AreaDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Area domain', () => {
            const prismaObj: PrismaArea = {
                id: 'id-123',
                name: 'Area'
            } as PrismaArea;

            const expectedDomainObj = { test: 'domain' } as unknown as Area;
            jest.spyOn(Area, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = AreaDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});