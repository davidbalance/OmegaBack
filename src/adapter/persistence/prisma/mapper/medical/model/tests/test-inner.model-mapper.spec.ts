import { TestInnerModel } from "@omega/medical/core/model/test/test-inner.model";
import { TestInnerModel as PrismaTestInnerModel } from "@prisma/client";
import { TestInnerModelMapper } from "../test-inner.model-mapper";

describe('TestInnerModelMapper', () => {
    it('should correctly map a PrismaTestInnerModel to an TestInnerModel instance', () => {
        const prismaValue: PrismaTestInnerModel = {
            testId: "test-123",
            orderId: "order-123",
            examName: "Exam",
            examSubtype: "Subtype",
            examType: "Type",
            isActive: true
        };

        const expectedValue = new TestInnerModel({ ...prismaValue });
        const result = TestInnerModelMapper.toModel(prismaValue);

        expect(result.testId).toBe(expectedValue.testId);
        expect(result.orderId).toBe(expectedValue.orderId);
        expect(result.examName).toBe(expectedValue.examName);
        expect(result.examSubtype).toBe(expectedValue.examSubtype);
        expect(result.examType).toBe(expectedValue.examType);
        expect(result.isActive).toBe(expectedValue.isActive);
    });
});