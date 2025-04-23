import { Test } from "@omega/medical/core/domain/test/test.domain";
import { MedicalTest as PrismaTest, MedicalReport as PrismaReport, MedicalResult as PrismaResult, MedicalDiseaseReport as PrismaDisease, MedicalTestExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";
import { TestExternalKey } from "@omega/medical/core/domain/test/value-objects/test-external-key.value-object";
import { PrismaTestWithResultAndReportAndDiseases, TestDomainMapper } from "../test.domain-mapper";
import { Result } from "@omega/medical/core/domain/test/result.domain";
import { DiseaseReport } from "@omega/medical/core/domain/test/disease-report.domain";
import { Report } from "@omega/medical/core/domain/test/report.domain";
import { DiseaseReportDomainMapper } from "../disease-report.domain-mapper";
import { ResultDomainMapper } from "../result.domain-mapper";
import { ReportDomainMapper } from "../report.domain-mapper";
import { CreateTestExternalKeyPayload } from "@omega/medical/core/domain/test/payloads/test-external-key.payloads";

describe('TestDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Test domain object to Prisma input', () => {
            const domainObj: Test = {
                id: 'client-123',
                exam: {
                    name: 'Exam',
                    subtype: 'Subtype',
                    type: 'Type',
                },
                orderId: 'order-123',
            } as unknown as Test;

            const expected: Prisma.MedicalTestUncheckedCreateInput = {
                id: 'client-123',
                examName: 'Exam',
                examSubtype: 'Subtype',
                examType: 'Type',
                orderId: 'order-123',
            }

            const result = TestDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: Test = {
                id: 'client-123',
                exam: {
                    examName: 'Exam',
                    examSubtype: 'Subtype',
                    examType: 'Type',
                },
                orderId: 'order-123',
            } as unknown as Test;

            const result = TestDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.examName).toBe(domainObj.exam.name);
            expect(result.examSubtype).toBe(domainObj.exam.subtype);
            expect(result.examType).toBe(domainObj.exam.type);
            expect(result.orderId).toBe(domainObj.orderId);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaTestWithResultAndReportAndDiseases = {
            id: 'client-123',
            examName: 'Exam',
            examSubtype: 'Subtype',
            examType: 'Type',
            orderId: 'order-123',
            checklist: true,
            isActive: true,
            diseases: [{ id: 'disease-report-123' }] as unknown as PrismaDisease[],
            report: { id: 'report-123' } as unknown as PrismaReport,
            result: { id: 'result-123' } as unknown as PrismaResult,
            externalKeys: [{ id: 'external-key-123' }] as unknown as PrismaExternalKey[],
            createdAt: new Date(),
            updatedAt: null
        };

        let spyDiseaseReportDomainMapper: jest.SpyInstance<DiseaseReport, [value: { id: string; createdAt: Date; updatedAt: Date | null; diseaseId: string; diseaseName: string; diseaseGroupId: string; diseaseGroupName: string; commentary: string; testId: string; }], any>;
        let spyResultDomainMapper: jest.SpyInstance<Result, [value: { id: string; createdAt: Date; updatedAt: Date | null; testId: string; filepath: string | null; hasFile: boolean; }], any>;
        let spyReportDomainMapper: jest.SpyInstance<Report, [value: { id: string; createdAt: Date; updatedAt: Date | null; testId: string; content: string | null; filepath: string | null; createAt: Date; }], any>;
        let spyTestExternalKey: jest.SpyInstance<TestExternalKey, [value: CreateTestExternalKeyPayload], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyDiseaseReportDomainMapper = jest.spyOn(DiseaseReportDomainMapper, 'toDomain').mockReturnValue({ mapped: 'email' } as unknown as DiseaseReport);
            spyResultDomainMapper = jest.spyOn(ResultDomainMapper, 'toDomain').mockReturnValue({ mapped: 'record' } as unknown as Result);
            spyReportDomainMapper = jest.spyOn(ReportDomainMapper, 'toDomain').mockReturnValue({ mapped: 'record' } as unknown as Report);
            spyTestExternalKey = jest.spyOn(TestExternalKey, 'create').mockReturnValue({ mapped: 'record' } as unknown as TestExternalKey);
        });

        it('should correctly map a PrismaTestWithResultAndReportAndDiseases to an Test domain object', () => {
            const expectedDomainObj = { test: 'domain' } as unknown as Test;
            jest.spyOn(Test, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = TestDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should map emails using DiseaseReportDomainMapper', () => {
            TestDomainMapper.toDomain(basePrismaObj);
            expect(spyDiseaseReportDomainMapper).toHaveBeenCalledTimes(1);
            expect(spyDiseaseReportDomainMapper).toHaveBeenCalledWith({ ...basePrismaObj.diseases[0] });
        });

        it('should map records using ResultDomainMapper', () => {
            TestDomainMapper.toDomain(basePrismaObj);
            expect(spyResultDomainMapper).toHaveBeenCalledWith({ ...basePrismaObj.result });
        });

        it('should map records using ReportDomainMapper', () => {
            TestDomainMapper.toDomain(basePrismaObj);
            expect(spyReportDomainMapper).toHaveBeenCalledWith({ ...basePrismaObj.report });
        });

        it('should map emails using TestExternalKey', () => {
            TestDomainMapper.toDomain(basePrismaObj);
            expect(spyTestExternalKey).toHaveBeenCalledTimes(1);
            expect(spyTestExternalKey).toHaveBeenCalledWith({ ...basePrismaObj.externalKeys[0] });
        });
    });
});