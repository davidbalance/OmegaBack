import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamSubtypeModel as PrismaExamSubtypeModel } from "@prisma/client";
import { ExamSubtypeModelMapper } from "../exam-subtype.model-mapper";

describe('ExamSubtypeModelMapper', () => {
    it('should correctly map a PrismaExamSubtypeModel to an ExamSubtypeModel instance', () => {
        const prismaValue: PrismaExamSubtypeModel = {
            subtypeId: 'id-123',
            subtypeName: 'Subtype',
            typeId: 'type-123',
            hasExams: true
        };

        const expectedValue = new ExamSubtypeModel({ ...prismaValue });
        const result = ExamSubtypeModelMapper.toModel(prismaValue);
        expect(result.subtypeId).toBe(expectedValue.subtypeId);
        expect(result.subtypeName).toBe(expectedValue.subtypeName);
        expect(result.typeId).toBe(expectedValue.typeId);
        expect(result.hasExams).toBe(expectedValue.hasExams);
    });
});
