import { Report } from "@omega/medical/core/domain/test/report.domain";
import { MedicalReport as PrismaReport, Prisma } from "@prisma/client";
import { ReportDomainMapper } from "../report.domain-mapper";

describe('ReportDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Report domain object to a Prisma input', () => {
            const domainObj: Report = {
                id: 'id-123',
                testId: 'test-123',
            } as unknown as Report;

            const expected: Prisma.MedicalReportUncheckedCreateInput = {
                id: 'id-123',
                testId: 'test-123',
            }

            const result = ReportDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Report = {
                id: 'id-123',
                testId: 'test-123',
            } as unknown as Report;

            const result = ReportDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.testId).toBe(domainObj.testId);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Report domain', () => {
            const prismaObj: PrismaReport = {
                id: 'id-123',
                testId: 'test-123',
                content: 'Report content',
                filepath: 'filePath',
                createAt: new Date(),
                createdAt: new Date(),
                updatedAt: null
            };

            const expectedDomainObj = { test: 'domain' } as unknown as Report;
            jest.spyOn(Report, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ReportDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});