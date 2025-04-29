import { ExamSubtype } from "@omega/laboratory/core/domain/exam/exam-subtype.domain";
import { ExamSubtypeExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";
import { ExamSubtypeDomainMapper, PrismaExamSubtypeExtended } from "../exam-subtype.domain-mapper";
import { ExamDomainMapper, PrismaExamExtended } from "../exam.domain-mapper";
import { ExamSubtypeExternalKey, ExamSubtypeExternalKeyProps } from "@omega/laboratory/core/domain/exam/value-objects/exam-subtype-external-key.value-object";
import { Exam } from "@omega/laboratory/core/domain/exam/exam.domain";

describe('ExamSubtypeDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an ExamSubtype domain object to Prisma input', () => {
            const domainObj: ExamSubtype = {
                id: 'exam-type-123',
                name: 'Exam Type',
                typeId: 'type-123'
            } as unknown as ExamSubtype;

            const expected: Prisma.ExamSubtypeUncheckedCreateInput = {
                id: 'exam-type-123',
                name: 'Exam Type',
                typeId: 'type-123'
            }

            const result = ExamSubtypeDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: ExamSubtype = {
                id: 'exam-type-123',
                name: 'Exam Type',
                typeId: 'type-123'
            } as unknown as ExamSubtype;

            const result = ExamSubtypeDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
            expect(result.typeId).toBe(domainObj.typeId);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaExamSubtypeExtended = {
            id: "id-123",
            name: "Laboratory Test",
            createdAt: new Date(),
            isActive: true,
            typeId: 'type-123',
            updatedAt: null,
            exams: [{ id: 'exam-123' }] as unknown as PrismaExamExtended[],
            externalKeys: [{ subtypeId: 'type-id-123' }] as unknown as PrismaExternalKey[]
        };

        let spyExamDomainMapper: jest.SpyInstance<Exam, [value: PrismaExamExtended], any>;
        let spyExamSubtypeExternalKeyCreate: jest.SpyInstance<ExamSubtypeExternalKey, [value: ExamSubtypeExternalKeyProps], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyExamDomainMapper = jest.spyOn(ExamDomainMapper, 'toDomain').mockReturnValue({ mapped: 'exam' } as unknown as Exam);
            spyExamSubtypeExternalKeyCreate = jest.spyOn(ExamSubtypeExternalKey, 'create').mockReturnValue({ mapped: 'token' } as unknown as ExamSubtypeExternalKey);
        });

        it('should correctly map a PrismaExamSubtypeExtended to an ExamSubtype domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as ExamSubtype;
            jest.spyOn(ExamSubtype, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ExamSubtypeDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should map subtypes using ExamSubtypeDomainMapper', () => {
            ExamSubtypeDomainMapper.toDomain(basePrismaObj);
            expect(spyExamDomainMapper).toHaveBeenCalledTimes(1);
            expect(spyExamDomainMapper).toHaveBeenCalledWith({ id: basePrismaObj.exams[0].id });
        });

        it('should create external keys using ExamSubtype when token is present', () => {
            ExamSubtypeDomainMapper.toDomain(basePrismaObj);
            expect(spyExamSubtypeExternalKeyCreate).toHaveBeenCalledWith({ subtypeId: basePrismaObj.externalKeys[0].subtypeId, subtypeExamId: basePrismaObj.externalKeys[0].subtypeId });
        });
    });
});