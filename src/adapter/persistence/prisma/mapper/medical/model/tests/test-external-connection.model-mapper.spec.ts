import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { TestExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";
import { TestExternalConnectionModelMapper } from "../test-external-connection.model-mapper";

describe('TestExternalConnectionModelMapper', () => {
    it('should correctly map a PrismaExternalConnection to an TestExternalConnectionModel instance', () => {
        const prismaValue: PrismaExternalConnection = {
            testId: "test-123",
            testExternalKey: "key-123",
            testExternalOwner: "key-owner"
        };

        const expectedValue = new TestExternalConnectionModel({ ...prismaValue });
        const result = TestExternalConnectionModelMapper.toModel(prismaValue);

        expect(result.testId).toBe(expectedValue.testId);
        expect(result.testExternalKey).toBe(expectedValue.testExternalKey);
        expect(result.testExternalOwner).toBe(expectedValue.testExternalOwner);
    });
});