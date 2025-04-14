import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { ExamExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";
import { ExamExternalConnectionModelMapper } from "../exam-external-connection.model-mapper";

describe('ExamExternalConnectionModelMapper', () => {
    it('should correctly map a PrismaExternalConnection to an ExamExternalConnectionModel instance', () => {
        const prismaValue: PrismaExternalConnection = {
            examId: 'exam-123',
            examExternalKey: 'external-key',
            examExternalOwner: 'external-owner',
            subtypeId: 'subtype-123',
        };

        const expectedValue = new ExamExternalConnectionModel({ ...prismaValue });
        const result = ExamExternalConnectionModelMapper.toModel(prismaValue);
        expect(result.examId).toBe(expectedValue.examId);
        expect(result.examExternalKey).toBe(expectedValue.examExternalKey);
        expect(result.examExternalOwner).toBe(expectedValue.examExternalOwner);
        expect(result.subtypeId).toBe(expectedValue.subtypeId);
    });
});
