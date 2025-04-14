import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { ExamSubtypeExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";
import { ExamSubtypeExternalConnectionModelMapper } from "../exam-subtype-external-connection.model-mapper";

describe('ExamSubtypeExternalConnectionModelMapper', () => {
    it('should correctly map a PrismaExternalConnection to an ExamSubtypeExternalConnectionModel instance', () => {
        const prismaValue: PrismaExternalConnection = {
            subtypeId: 'subtype-123',
            subtypeExternalKey: 'external-key',
            subtypeExternalOwner: 'external-owner',
            typeId: 'type-123',
        };

        const expectedValue = new ExamSubtypeExternalConnectionModel({ ...prismaValue });
        const result = ExamSubtypeExternalConnectionModelMapper.toModel(prismaValue);
        expect(result.subtypeId).toBe(expectedValue.subtypeId);
        expect(result.subtypeExternalKey).toBe(expectedValue.subtypeExternalKey);
        expect(result.subtypeExternalOwner).toBe(expectedValue.subtypeExternalOwner);
        expect(result.typeId).toBe(expectedValue.typeId);
    });
});
