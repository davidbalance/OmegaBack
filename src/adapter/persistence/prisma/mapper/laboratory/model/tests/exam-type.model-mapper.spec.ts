import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeModel as PrismaExamTypeModel } from "@prisma/client";
import { ExamTypeModelMapper } from "../exam-type.model-mapper";

describe('ExamTypeModelMapper', () => {
    it('should correctly map a PrismaExamTypeModel to an ExamTypeModel instance', () => {
        const prismaValue: PrismaExamTypeModel = {
            typeId: 'type-123',
            typeName: 'Type',
            hasSubtypes: true
        };

        const expectedValue = new ExamTypeModel({ ...prismaValue });
        const result = ExamTypeModelMapper.toModel(prismaValue);
        expect(result.typeId).toBe(expectedValue.typeId);
        expect(result.typeName).toBe(expectedValue.typeName);
        expect(result.hasSubtypes).toBe(expectedValue.hasSubtypes);
    });
});
