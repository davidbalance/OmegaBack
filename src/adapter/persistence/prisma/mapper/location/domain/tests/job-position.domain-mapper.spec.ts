import { JobPosition } from "@omega/location/core/domain/job-position/job-position.domain";
import { JobPosition as PrismaJobPosition, Prisma } from "@prisma/client";
import { JobPositionDomainMapper } from "../job-position.domain-mapper";

describe('JobPositionDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an JobPosition domain object to a Prisma input', () => {
            const domainObj: JobPosition = {
                id: 'id-123',
                name: 'JobPosition'
            } as unknown as JobPosition;

            const expected: Prisma.JobPositionUncheckedCreateInput = {
                id: 'id-123',
                name: 'JobPosition'
            }

            const result = JobPositionDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: JobPosition = {
                id: 'id-123',
                name: 'JobPosition'
            } as unknown as JobPosition;

            const result = JobPositionDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the JobPosition domain', () => {
            const prismaObj: PrismaJobPosition = {
                id: 'id-123',
                name: 'JobPosition'
            } as PrismaJobPosition;

            const expectedDomainObj = { test: 'domain' } as unknown as JobPosition;
            jest.spyOn(JobPosition, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = JobPositionDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});