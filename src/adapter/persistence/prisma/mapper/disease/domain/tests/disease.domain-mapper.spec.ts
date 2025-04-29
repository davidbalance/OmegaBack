import { Disease } from "@omega/disease/core/domain/disease.domain";
import { Prisma, Disease as PrismaDisease } from "@prisma/client";
import { DiseaseDomainMapper } from "../disease.domain-mapper";

describe('DiseaseDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Disease domain object to a Prisma input', () => {
            const domainObj: Disease = {
                id: 'disease-123',
                name: 'Malaria',
                groupId: 'group-001'
            } as unknown as Disease;

            const expected: Prisma.DiseaseUncheckedCreateInput = {
                id: 'disease-123',
                name: 'Malaria',
                groupId: 'group-001'
            }

            const result = DiseaseDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Disease = {
                id: 'disease-123',
                name: 'Malaria',
                groupId: 'group-001'
            } as unknown as Disease;

            const result = DiseaseDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
            expect(result.groupId).toBe(domainObj.groupId);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Disease domain', () => {
            const prismaObj: PrismaDisease = {
                id: 'disease-123',
                name: 'Malaria',
                groupId: 'group-001'
            } as PrismaDisease;

            const expectedDomainObj = { test: 'domain' } as unknown as Disease;
            jest.spyOn(Disease, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = DiseaseDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});