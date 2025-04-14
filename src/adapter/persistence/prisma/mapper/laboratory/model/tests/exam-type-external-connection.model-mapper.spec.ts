import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";
import { ExamTypeExternalConnectionModelMapper } from "../exam-type-external-connection.model-mapper";

describe('ExamTypeExternalConnectionModelMapper', () => {
    it('should correctly map a PrismaExternalConnection to an ExamTypeExternalConnectionModel instance', () => {
        const prismaValue: PrismaExternalConnection = {
            typeExternalKey: 'key-124',
            typeExternalOwner: 'key-owner',
            typeId: 'id-123'
        };

        const expectedValue = new ExamTypeExternalConnectionModel({ ...prismaValue });
        const result = ExamTypeExternalConnectionModelMapper.toModel(prismaValue);
        expect(result.typeExternalKey).toBe(expectedValue.typeExternalKey);
        expect(result.typeExternalOwner).toBe(expectedValue.typeExternalOwner);
        expect(result.typeId).toBe(expectedValue.typeId);
    });
});
