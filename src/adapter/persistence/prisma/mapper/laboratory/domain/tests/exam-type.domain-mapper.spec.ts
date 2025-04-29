import { ExamType } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { ExamTypeExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";
import { ExamTypeExternalKey, ExamTypeExternalKeyProps } from "@omega/laboratory/core/domain/exam/value-objects/exam-type-external-key.value-object";
import { ExamTypeDomainMapper, PrismaExamTypeExtended } from "../exam-type.domain-mapper";
import { ExamSubtypeDomainMapper, PrismaExamSubtypeExtended } from "../exam-subtype.domain-mapper";
import { ExamSubtype } from "@omega/laboratory/core/domain/exam/exam-subtype.domain";

describe('ExamTypeDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an ExamType domain object to Prisma input', () => {
            const domainObj: ExamType = {
                id: 'exam-type-123',
                name: 'Exam Type'
            } as unknown as ExamType;

            const expected: Prisma.ExamTypeUncheckedCreateInput = {
                id: 'exam-type-123',
                name: 'Exam Type'
            }

            const result = ExamTypeDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: ExamType = {
                id: 'auth-1',
                email: 'test@example.com',
                name: 'John',
                lastname: 'Doe',
                password: 'hashedpassword'
            } as unknown as ExamType;

            const result = ExamTypeDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaExamTypeExtended = {
            id: "id-123",
            name: "Laboratory Test",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            subtypes: [{ id: 'subtype-123' }] as unknown as PrismaExamSubtypeExtended[],
            externalKeys: [{ typeId: 'type-id-123' }] as unknown as PrismaExternalKey[]
        };

        let spyExamSubtypeDomainMapper: jest.SpyInstance<ExamSubtype, [value: PrismaExamSubtypeExtended], any>;
        let spyExamTypeExternalKeyCreate: jest.SpyInstance<ExamTypeExternalKey, [value: ExamTypeExternalKeyProps], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyExamSubtypeDomainMapper = jest.spyOn(ExamSubtypeDomainMapper, 'toDomain').mockReturnValue({ mapped: 'apikey' } as unknown as ExamSubtype);
            spyExamTypeExternalKeyCreate = jest.spyOn(ExamTypeExternalKey, 'create').mockReturnValue({ mapped: 'token' } as unknown as ExamTypeExternalKey);
        });

        it('should correctly map a PrismaExamTypeExtended to an ExamType domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as ExamType;
            jest.spyOn(ExamType, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ExamTypeDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should map subtypes using ExamSubtypeDomainMapper', () => {
            ExamTypeDomainMapper.toDomain(basePrismaObj);
            expect(spyExamSubtypeDomainMapper).toHaveBeenCalledTimes(1);
            expect(spyExamSubtypeDomainMapper).toHaveBeenCalledWith({ id: 'subtype-123' });
        });

        it('should create external keys using ExamTypeExternalKey when token is present', () => {
            ExamTypeDomainMapper.toDomain(basePrismaObj);
            expect(spyExamTypeExternalKeyCreate).toHaveBeenCalledWith({ typeId: basePrismaObj.externalKeys[0].typeId, typeExamId: basePrismaObj.externalKeys[0].typeId });
        });
    });
});