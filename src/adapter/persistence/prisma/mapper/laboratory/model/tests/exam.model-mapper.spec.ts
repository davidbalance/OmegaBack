import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { ExamModel as PrismaExamModel } from "@prisma/client";
import { ExamModelMapper } from "../exam.model-mapper";

describe('ExamModelMapper', () => {
    it('should correctly map a PrismaExamModel to an ExamModel instance', () => {
        const prismaValue: PrismaExamModel = {
            examId: 'id-123',
            examName: 'exam',
            subtypeId: 'subtype-123'
        };

        const expectedValue = new ExamModel({ ...prismaValue });
        const result = ExamModelMapper.toModel(prismaValue);
        expect(result.examId).toBe(expectedValue.examId);
        expect(result.examName).toBe(expectedValue.examName);
        expect(result.subtypeId).toBe(expectedValue.subtypeId);
    });
});
