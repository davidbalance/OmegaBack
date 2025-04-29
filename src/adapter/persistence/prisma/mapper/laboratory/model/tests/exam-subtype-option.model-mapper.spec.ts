import { ExamSubtypeOptionModel } from "@omega/laboratory/core/model/exam/exam-subtype-option.model";
import { ExamSubtypeOptionModel as PrismaExamSubtypeOptionModel } from "@prisma/client";
import { ExamSubtypeOptionModelMapper } from "../exam-subtype-option.model-mapper";

describe('ExamSubtypeOptionModelMapper', () => {
    it('should correctly map a PrismaExamSubtypeOptionModel to an ExamSubtypeOptionModel instance', () => {
        const prismaValue: PrismaExamSubtypeOptionModel = {
            examLabel: 'Exam Label',
            examValue: 'exam-123',
            subtypeLabel: 'Subtype Label',
            subtypeValue: 'subtype-123'
        };

        const expectedValue = new ExamSubtypeOptionModel({ ...prismaValue });
        const result = ExamSubtypeOptionModelMapper.toModel(prismaValue);
        expect(result.examLabel).toBe(expectedValue.examLabel);
        expect(result.examValue).toBe(expectedValue.examValue);
        expect(result.subtypeLabel).toBe(expectedValue.subtypeLabel);
        expect(result.subtypeValue).toBe(expectedValue.subtypeValue);
    });
});
