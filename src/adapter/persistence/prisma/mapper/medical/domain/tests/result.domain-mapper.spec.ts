import { Result } from "@omega/medical/core/domain/test/result.domain";
import { MedicalResult as PrismaResult, Prisma } from "@prisma/client";
import { ResultDomainMapper } from "../result.domain-mapper";

describe('ResultDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Result domain object to a Prisma input', () => {
            const domainObj: Result = {
                id: 'id-123',
                testId: 'test-123',
                filepath: '/path/to/file'
            } as unknown as Result;

            const expected: Prisma.MedicalResultUncheckedCreateInput = {
                id: 'id-123',
                testId: 'test-123',
                filepath: '/path/to/file'
            }

            const result = ResultDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Result = {
                id: 'id-123',
                testId: 'test-123',
                filepath: '/path/to/file'
            } as unknown as Result;

            const result = ResultDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.testId).toBe(domainObj.testId);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Result domain', () => {
            const prismaObj: PrismaResult = {
                id: 'id-123',
                testId: 'test-123',
                filepath: '/path/to/file',
                hasFile: true,
                createdAt: new Date(),
                updatedAt: null
            };

            const expectedDomainObj = { test: 'domain' } as unknown as Result;
            jest.spyOn(Result, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ResultDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});