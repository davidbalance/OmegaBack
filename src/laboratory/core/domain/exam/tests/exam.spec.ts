import { ExamExternalKeyConflictError } from "../errors/exam-external-key.errors";
import { Exam } from "../exam.domain";
import { AddExamExternalKeyPayload } from "../payloads/exam.payloads";

describe('Exam Entity', () => {
    let exam: Exam;

    beforeEach(() => {
        exam = Exam.create({ subtypeId: 'Subtype1', name: 'Blood exam' });
    });

    it('should get the correct initial state', () => {
        expect(exam.subtypeId).toEqual('Subtype1');
        expect(exam.name).toEqual('Blood exam');
        expect(exam.externalKeys).toHaveLength(0);
    });

    it('should rehydrate', () => {
        const examId = crypto.randomUUID();
        const rehydrated = Exam.rehydrate({
            id: examId,
            subtypeId: 'Subtype1',
            name: 'Rehydrated Exam',
            externalKeys: []
        });

        expect(rehydrated.id).toEqual(examId);
        expect(rehydrated.subtypeId).toEqual('Subtype1');
        expect(rehydrated.name).toEqual('Rehydrated Exam');
        expect(rehydrated.externalKeys).toHaveLength(0);
    });

    it('should rename the exam', () => {
        exam.rename('Updated Exam');
        expect(exam.name).toEqual('Updated Exam');
    });

    it('should add an external key property', () => {
        const payload: AddExamExternalKeyPayload = { owner: 'omega', value: 'sample-key' }

        exam.addExternalKey(payload);

        expect(exam.externalKeys).toHaveLength(1);
        expect(exam.externalKeys[0].owner).toBe(payload.owner);
        expect(exam.externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key', () => {
        const payload: AddExamExternalKeyPayload = { owner: 'omega', value: 'sample-key' }
        exam.addExternalKey(payload);

        expect(() => exam.addExternalKey(payload)).toThrow(ExamExternalKeyConflictError);
    });
});
