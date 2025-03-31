import { ExamExternalKeyConflictError } from "../errors/exam-external-key.errors";
import { ExamSubtypeExternalKeyConflictError } from "../errors/exam-subtype-external-key.errors";
import { ExamConflictError, ExamNotFoundError } from "../errors/exam.errors";
import { ExamSubtype } from "../exam-subtype.domain";
import { AddExamSubtypeExternalKeyPayload, AddExternalKeyToExamPayload } from "../payloads/exam-subtype.payload";

describe('ExamSubtype Entity', () => {
    let examSubtype: ExamSubtype;

    beforeEach(() => {
        examSubtype = ExamSubtype.create({ typeId: 'Type1', name: 'laboratory' });
    });

    it('should get the correct initial state', () => {
        expect(examSubtype.typeId).toEqual('Type1');
        expect(examSubtype.name).toEqual('laboratory');
        expect(examSubtype.exams).toHaveLength(0);
        expect(examSubtype.externalKeys).toHaveLength(0);
    });

    it('should rehydrate an existing exam subtype', () => {
        const subtypeId = crypto.randomUUID();
        const rehydrated = ExamSubtype.rehydrate({
            id: subtypeId,
            typeId: 'Type1',
            name: 'laboratory',
            exams: [],
            externalKeys: []
        });

        expect(rehydrated.id).toEqual(subtypeId);
        expect(rehydrated.typeId).toEqual('Type1');
        expect(rehydrated.name).toEqual('laboratory');
        expect(rehydrated.exams).toHaveLength(0);
        expect(examSubtype.externalKeys).toHaveLength(0);
    });

    it('should rename the exam subtype', () => {
        examSubtype.rename('blood exam');
        expect(examSubtype.name).toEqual('blood exam');
    });

    it('should add an exam to the subtype', () => {
        examSubtype.addExam({ examName: 'rx' });
        expect(examSubtype.exams).toHaveLength(1);
        expect(examSubtype.exams[0].name).toEqual('rx');
    });

    it('should not allow duplicate exam names', () => {
        examSubtype.addExam({ examName: 'rx' });
        expect(() => examSubtype.addExam({ examName: 'rx' })).toThrow(ExamConflictError);
    });

    it('should remove an exam from the subtype', () => {
        examSubtype.addExam({ examName: 'rx' });
        const examId = examSubtype.exams[0].id;
        examSubtype.removeExam(examId);
        expect(examSubtype.exams).toHaveLength(0);
    });

    it('should throw an error when removing a non-existent exam', () => {
        expect(() => examSubtype.removeExam('invalid-id')).toThrow(ExamNotFoundError);
    });

    it('should move an exam to another subtype', () => {
        const targetSubtype = ExamSubtype.create({ typeId: 'Type1', name: 'Subtype 1' });
        examSubtype.addExam({ examName: 'rx' });
        const examId = examSubtype.exams[0].id;

        examSubtype.moveExamTo(targetSubtype, examId);
        expect(examSubtype.exams).toHaveLength(0);
        expect(targetSubtype.exams).toHaveLength(1);
        expect(targetSubtype.exams[0].name).toEqual('rx');
    });

    it('should throw an error when moving a non-existent exam', () => {
        const targetSubtype = ExamSubtype.create({ typeId: 'Type1', name: 'Subtype 1' });
        expect(() => examSubtype.moveExamTo(targetSubtype, 'invalid-id')).toThrow(ExamNotFoundError);
    });

    it('should rename an exam within the subtype', () => {
        examSubtype.addExam({ examName: 'rx' });
        const examId = examSubtype.exams[0].id;
        examSubtype.renameExam({ examId, examName: 'laboratory' });
        expect(examSubtype.exams[0].name).toEqual('laboratory');
    });

    it('should throw an error when renaming an exam to a duplicate name', () => {
        examSubtype.addExam({ examName: 'rx' });
        examSubtype.addExam({ examName: 'laboratory' });
        const examId = examSubtype.exams[0].id;
        expect(() => examSubtype.renameExam({ examId, examName: 'laboratory' })).toThrow(ExamConflictError);
    });

    it('should add an external key property', () => {
        const payload: AddExamSubtypeExternalKeyPayload = { owner: 'omega', value: 'sample-key' }

        examSubtype.addExternalKey(payload);

        expect(examSubtype.externalKeys).toHaveLength(1);
        expect(examSubtype.externalKeys[0].owner).toBe(payload.owner);
        expect(examSubtype.externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key', () => {
        const payload: AddExamSubtypeExternalKeyPayload = { owner: 'omega', value: 'sample-key' }
        examSubtype.addExternalKey(payload);

        expect(() => examSubtype.addExternalKey(payload)).toThrow(ExamSubtypeExternalKeyConflictError);
    });

    it('should add an external key for exam', () => {
        examSubtype.addExam({ examName: 'rx' });
        const value = [...examSubtype.exams].pop()!;
        const payload: AddExamSubtypeExternalKeyPayload = { owner: 'omega', value: 'sample-key' };

        examSubtype.addExternalKey(payload);

        expect(examSubtype.externalKeys).toHaveLength(1);
        expect(examSubtype.externalKeys[0].owner).toBe(payload.owner);
        expect(examSubtype.externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key exists on exam', () => {
        examSubtype.addExam({ examName: 'rx' });
        const value = [...examSubtype.exams].pop()!;

        const payload: AddExternalKeyToExamPayload = {
            owner: 'omega',
            value: 'sample-key',
            examId: value.id
        };

        examSubtype.addExternalKeyToExam(payload);

        expect(() => examSubtype.addExternalKeyToExam(payload)).toThrow(ExamExternalKeyConflictError);
    });
});
