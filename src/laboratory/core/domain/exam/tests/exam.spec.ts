import { Exam } from "../exam.domain";

describe('Exam Entity', () => {
    let exam: Exam;

    beforeEach(() => {
        exam = Exam.create({ subtypeId: 'Subtype1', name: 'Blood exam' });
    });

    it('should get the correct initial state', () => {
        expect(exam.subtypeId).toEqual('Subtype1');
        expect(exam.name).toEqual('Blood exam');
    });

    it('should rehydrate', () => {
        const examId = crypto.randomUUID();
        const rehydrated = Exam.rehydrate({
            id: examId,
            subtypeId: 'Subtype1',
            name: 'Rehydrated Exam'
        });

        expect(rehydrated.id).toEqual(examId);
        expect(rehydrated.subtypeId).toEqual('Subtype1');
        expect(rehydrated.name).toEqual('Rehydrated Exam');
    });

    it('should rename the exam', () => {
        exam.rename('Updated Exam');
        expect(exam.name).toEqual('Updated Exam');
    });
});
