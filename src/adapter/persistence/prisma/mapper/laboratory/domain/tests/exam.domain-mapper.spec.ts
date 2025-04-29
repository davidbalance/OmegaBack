import { Exam } from "@omega/laboratory/core/domain/exam/exam.domain";
import { ExamExternalKey, ExamExternalKeyProps } from "@omega/laboratory/core/domain/exam/value-objects/exam-external-key.value-object";
import { Exam as PrismaExam, ExamExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";
import { ExamDomainMapper, PrismaExamExtended } from "../exam.domain-mapper";

describe('ExamDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Exam domain object to Prisma input', () => {
            const domainObj: Exam = {
                id: 'exam-type-123',
                name: 'Exam Type',
                subtypeId: 'subtype-123'
            } as unknown as Exam;

            const expected: Prisma.ExamUncheckedCreateInput = {
                id: 'exam-type-123',
                name: 'Exam Type',
                subtypeId: 'subtype-123'
            }

            const result = ExamDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: Exam = {
                id: 'exam-type-123',
                name: 'Exam Type',
                subtypeId: 'subtype-123'
            } as unknown as Exam;

            const result = ExamDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
            expect(result.subtypeId).toBe(domainObj.subtypeId);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaExamExtended = {
            id: "id-123",
            name: "Laboratory Test",
            isActive: true,
            subtypeId: 'subtype-123',
            createdAt: new Date(),
            updatedAt: new Date(),
            externalKeys: [{ examId: 'type-id-123' }] as unknown as PrismaExternalKey[]
        };

        let spyExamExternalKeyCreate: jest.SpyInstance<ExamExternalKey, [value: ExamExternalKeyProps], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyExamExternalKeyCreate = jest.spyOn(ExamExternalKey, 'create').mockReturnValue({ mapped: 'token' } as unknown as ExamExternalKey);
        });

        it('should correctly map a PrismaExamExtended to an Exam domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as Exam;
            jest.spyOn(Exam, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ExamDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should create external keys using ExamExternalKey when token is present', () => {
            ExamDomainMapper.toDomain(basePrismaObj);
            expect(spyExamExternalKeyCreate).toHaveBeenCalledWith({ examId: basePrismaObj.externalKeys[0].examId });
        });
    });
});