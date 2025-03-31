import { ExamExternalKeyConflictError } from "../errors/exam-external-key.errors";
import { ExamSubtypeExternalKeyConflictError } from "../errors/exam-subtype-external-key.errors";
import { ExamSubtypeConflictError, ExamSubtypeNotFoundError } from "../errors/exam-subtype.errors";
import { ExamTypeExternalKeyConflictError } from "../errors/exam-type-external-key.errors";
import { ExamTypeInvalidError } from "../errors/exam-type.errors";
import { ExamNotFoundError } from "../errors/exam.errors";
import { ExamType } from "../exam-type.domain";
import { AddExamExternalKeyFromExamType, AddExamSubtypeExternalKeyFromExamType, AddExamTypeExternalKey } from "../payloads/exam-type.payload";

describe('ExamType Entity', () => {
    let examType: ExamType;

    beforeEach(() => {
        examType = ExamType.create({ name: 'laboratory' });
    });

    it('should get the correct initial state', () => {
        expect(examType.name).toEqual('laboratory');
        expect(examType.subtypes).toHaveLength(0);
        expect(examType.externalKeys).toHaveLength(0);
    });

    it('should rehydrate an ExamType', () => {
        const examTypeId = crypto.randomUUID();
        const rehydrated = ExamType.rehydrate({
            id: examTypeId,
            name: 'Imaging',
            subtypes: [],
            externalKeys: []
        });

        expect(rehydrated.id).toEqual(examTypeId);
        expect(rehydrated.name).toEqual('Imaging');
        expect(rehydrated.subtypes).toHaveLength(0);
        expect(rehydrated.externalKeys).toHaveLength(0);
    });

    it('should rename the exam type', () => {
        examType.rename('Urine Tests');
        expect(examType.name).toEqual('Urine Tests');
    });

    it('should throw an error when removing an ExamType with subtypes', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });
        expect(() => examType.remove()).toThrow(ExamTypeInvalidError);
    });

    it('should add a subtype to the exam type', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });

        expect(examType.subtypes.length).toEqual(1);
        expect(examType.subtypes[0].name).toEqual('Hemoglobin');
    });

    it('should not allow duplicate subtype names', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });

        expect(() => examType.addSubtype({ subtypeName: 'Hemoglobin' }))
            .toThrow(ExamSubtypeConflictError);
    });

    it('should remove a subtype from the exam type', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });
        const subtypeId = examType.subtypes[0].id;

        examType.removeSubtype(subtypeId);

        expect(examType.subtypes.length).toEqual(0);
    });

    it('should throw an error when removing a non-existent subtype', () => {
        expect(() => examType.removeSubtype('non-existent-id'))
            .toThrow(ExamSubtypeNotFoundError);
    });

    it('should move a subtype to another exam type', () => {
        const targetType = ExamType.create({ name: 'Urine Tests' });
        examType.addSubtype({ subtypeName: 'Hemoglobin' });
        const subtypeId = examType.subtypes[0].id;

        examType.moveSubtypeTo(targetType, subtypeId);

        expect(examType.subtypes.length).toEqual(0);
        expect(targetType.subtypes.length).toEqual(1);
        expect(targetType.subtypes[0].name).toEqual('Hemoglobin');
    });

    it('should throw an error when moving a non-existent subtype', () => {
        const targetType = ExamType.create({ name: 'Urine Tests' });

        expect(() => examType.moveSubtypeTo(targetType, 'non-existent-id'))
            .toThrow(ExamSubtypeNotFoundError);
    });
    it('should rename a subtype within the exam type', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });
        const subtypeId = examType.subtypes[0].id;

        examType.renameSubtype({ subtypeId, subtypeName: 'Hematocrit' });

        expect(examType.subtypes[0].name).toEqual('Hematocrit');
    });

    it('should add an exam to a subtype', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });
        const subtypeId = examType.subtypes[0].id;

        examType.addExamToSubtype({ subtypeId, examName: 'HbA1c' });

        expect(examType.subtypes[0].exams.length).toEqual(1);
        expect(examType.subtypes[0].exams[0].name).toEqual('HbA1c');
    });

    it('should remove an exam from a subtype', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });
        const subtypeId = examType.subtypes[0].id;

        examType.addExamToSubtype({ subtypeId, examName: 'HbA1c' });
        const examId = examType.subtypes[0].exams[0].id;

        examType.removeExamFromSubtype({ subtypeId, examId });

        expect(examType.subtypes[0].exams.length).toEqual(0);
    });

    it('should throw an error when removing a non-existent exam', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });
        const subtypeId = examType.subtypes[0].id;

        expect(() => examType.removeExamFromSubtype({ subtypeId, examId: 'non-existent-id' }))
            .toThrow(ExamNotFoundError);
    });

    it('should move an exam between subtypes', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });
        examType.addSubtype({ subtypeName: 'Iron Studies' });

        const fromSubtypeId = examType.subtypes[0].id;
        const toSubtypeId = examType.subtypes[1].id;

        examType.addExamToSubtype({ subtypeId: fromSubtypeId, examName: 'HbA1c' });
        const examId = examType.subtypes[0].exams[0].id;

        examType.moveExamTo(examType, { examId, fromSubtypeId, toSubtypeId });

        expect(examType.subtypes[0].exams.length).toEqual(0);
        expect(examType.subtypes[1].exams.length).toEqual(1);
        expect(examType.subtypes[1].exams[0].name).toEqual('HbA1c');
    });

    it('should throw an error when moving an exam from a non-existent subtype', () => {
        examType.addSubtype({ subtypeName: 'Iron Studies' });
        const toSubtypeId = examType.subtypes[0].id;

        expect(() => examType.moveExamTo(examType, {
            examId: 'exam-id',
            fromSubtypeId: 'non-existent-subtype',
            toSubtypeId
        })).toThrow(ExamSubtypeNotFoundError);
    });

    it('should rename an exam within a subtype', () => {
        examType.addSubtype({ subtypeName: 'Hemoglobin' });
        const subtypeId = examType.subtypes[0].id;

        examType.addExamToSubtype({ subtypeId, examName: 'HbA1c' });
        const examId = examType.subtypes[0].exams[0].id;

        examType.renameExamInSubtype({ subtypeId, examId, examName: 'Glycated Hemoglobin' });

        expect(examType.subtypes[0].exams[0].name).toEqual('Glycated Hemoglobin');
    });

    it('should add an external key property', () => {
        const payload: AddExamTypeExternalKey = { owner: 'omega', value: 'sample-key' }

        examType.addExternalKey(payload);

        expect(examType.externalKeys).toHaveLength(1);
        expect(examType.externalKeys[0].owner).toBe(payload.owner);
        expect(examType.externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key', () => {
        const payload: AddExamTypeExternalKey = { owner: 'omega', value: 'sample-key' }
        examType.addExternalKey(payload);

        expect(() => examType.addExternalKey(payload)).toThrow(ExamTypeExternalKeyConflictError);
    });

    it('should add an external key for exam subtype', () => {
        examType.addSubtype({ subtypeName: 'rx' });
        const value = [...examType.subtypes].pop()!;
        const payload: AddExamSubtypeExternalKeyFromExamType = {
            owner: 'omega',
            value: 'sample-key',
            subtypeId: value.id
        };

        examType.addExternalKeyToSubtype(payload);

        expect(examType.subtypes[0].externalKeys).toHaveLength(1);
        expect(examType.subtypes[0].externalKeys[0].owner).toBe(payload.owner);
        expect(examType.subtypes[0].externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key exists on exam subtype', () => {
        examType.addSubtype({ subtypeName: 'rx' });
        const value = [...examType.subtypes].pop()!;
        const payload: AddExamSubtypeExternalKeyFromExamType = {
            owner: 'omega',
            value: 'sample-key',
            subtypeId: value.id
        };

        examType.addExternalKeyToSubtype(payload);

        expect(() => examType.addExternalKeyToSubtype(payload)).toThrow(ExamSubtypeExternalKeyConflictError);
    });

    it('should add an external key for exam', () => {
        examType.addSubtype({ subtypeName: 'rx' });
        const subtype = [...examType.subtypes].pop()!;

        examType.addExamToSubtype({ examName: 'rx', subtypeId: subtype.id });
        const exam = [...[...examType.subtypes].pop()!.exams].pop()!;

        const payload: AddExamExternalKeyFromExamType = {
            owner: 'omega',
            value: 'sample-key',
            examId: exam.id,
            subtypeId: subtype.id
        };

        examType.addExternalKeyToExam(payload);

        expect(examType.subtypes[0].exams[0].externalKeys).toHaveLength(1);
        expect(examType.subtypes[0].exams[0].externalKeys[0].owner).toBe(payload.owner);
        expect(examType.subtypes[0].exams[0].externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key exists on exam', () => {
        examType.addSubtype({ subtypeName: 'rx' });
        const subtype = [...examType.subtypes].pop()!;

        examType.addExamToSubtype({ examName: 'rx', subtypeId: subtype.id });
        const exam = [...[...examType.subtypes].pop()!.exams].pop()!;

        const payload: AddExamExternalKeyFromExamType = {
            owner: 'omega',
            value: 'sample-key',
            examId: exam.id,
            subtypeId: subtype.id
        };


        examType.addExternalKeyToExam(payload);

        expect(() => examType.addExternalKeyToExam(payload)).toThrow(ExamExternalKeyConflictError);
    });
});
