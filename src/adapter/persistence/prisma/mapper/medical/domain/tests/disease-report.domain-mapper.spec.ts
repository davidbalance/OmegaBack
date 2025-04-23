import { DiseaseReport } from "@omega/medical/core/domain/test/disease-report.domain";
import { MedicalDiseaseReport as MedicalDiseaseReport, Prisma } from "@prisma/client";
import { DiseaseReportDomainMapper } from "../disease-report.domain-mapper";

describe('DiseaseReportDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an DiseaseReport domain object to a Prisma input', () => {
            const domainObj: DiseaseReport = {
                id: 'id-123',
                commentary: 'My test commentary',
                diseaseGroupId: 'group-123',
                diseaseGroupName: 'My group',
                diseaseId: 'disease-123',
                diseaseName: 'My disease',
                testId: 'test-123',
            } as unknown as DiseaseReport;

            const expected: Prisma.MedicalDiseaseReportUncheckedCreateInput = {
                id: 'id-123',
                commentary: 'My test commentary',
                diseaseGroupId: 'group-123',
                diseaseGroupName: 'My group',
                diseaseId: 'disease-123',
                diseaseName: 'My disease',
                testId: 'test-123'
            }

            const result = DiseaseReportDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: DiseaseReport = {
                id: 'id-123',
                commentary: 'My test commentary',
                diseaseGroupId: 'group-123',
                diseaseGroupName: 'My group',
                diseaseId: 'disease-123',
                diseaseName: 'My disease',
                testId: 'test-123',
            } as unknown as DiseaseReport;

            const result = DiseaseReportDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.commentary).toBe(domainObj.commentary);
            expect(result.diseaseGroupId).toBe(domainObj.diseaseGroupId);
            expect(result.diseaseGroupName).toBe(domainObj.diseaseGroupName);
            expect(result.diseaseId).toBe(domainObj.diseaseId);
            expect(result.diseaseName).toBe(domainObj.diseaseName);
            expect(result.testId).toBe(domainObj.testId);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the DiseaseReport domain', () => {
            const prismaObj: MedicalDiseaseReport = {
                id: 'id-123',
                commentary: 'My test commentary',
                diseaseGroupId: 'group-123',
                diseaseGroupName: 'My group',
                diseaseId: 'disease-123',
                diseaseName: 'My disease',
                testId: 'test-123',
            } as MedicalDiseaseReport;

            const expectedDomainObj = { test: 'domain' } as unknown as DiseaseReport;
            jest.spyOn(DiseaseReport, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = DiseaseReportDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});