import { ExamTypeOptionModel } from "@omega/laboratory/core/model/exam/exam-type-option.model";
import { ExamTypeOptionModel as PrismaExamTypeOptionModel } from "@prisma/client";
import { ExamTypeOptionModelMapper } from "../exam-type-option.model-mapper";

describe('ExamTypeOptionModelMapper', () => {
    it('should correctly map a PrismaExamTypeOptionModel to an ExamTypeOptionModel instance', () => {
        const prismaValue: PrismaExamTypeOptionModel = {
            subtypeLabel: 'Subtype label',
            subtypeValue: 'Subtype value',
            typeLabel: 'Type Label',
            typeValue: 'Type Value'
        };

        const expectedValue = new ExamTypeOptionModel({ ...prismaValue });
        const result = ExamTypeOptionModelMapper.toModel(prismaValue);
        expect(result.subtypeLabel).toBe(expectedValue.subtypeLabel);
        expect(result.subtypeValue).toBe(expectedValue.subtypeValue);
        expect(result.typeLabel).toBe(expectedValue.typeLabel);
        expect(result.typeValue).toBe(expectedValue.typeValue);
    });
});
