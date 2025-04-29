import { TestModel } from "@omega/medical/core/model/test/test.model";
import { TestModel as PrismaTestModel } from "@prisma/client";
import { TestModelMapper } from "../test.model-mapper";

describe('TestModelMapper', () => {
    it('should correctly map a PrismaTestModel to an TestModel instance', () => {
        const prismaValue: PrismaTestModel = {
            testId: "test-123",
            testCheck: false,
            resultHasFile: false,
            reportHasContent: false,
            orderId: "order-123",
            examName: "Exam",
            examSubtype: "Subtype",
            examType: "Type",
            diseases: null
        };

        const expectedValue = new TestModel({
            ...prismaValue,
            diseases: prismaValue.diseases ?? ''
        });
        const result = TestModelMapper.toModel(prismaValue);
        expect(result.testId).toBe(expectedValue.testId);
        expect(result.testCheck).toBe(expectedValue.testCheck);
        expect(result.resultHasFile).toBe(expectedValue.resultHasFile);
        expect(result.reportHasContent).toBe(expectedValue.reportHasContent);
        expect(result.orderId).toBe(expectedValue.orderId);
        expect(result.examName).toBe(expectedValue.examName);
        expect(result.examSubtype).toBe(expectedValue.examSubtype);
        expect(result.examType).toBe(expectedValue.examType);
        expect(result.diseases).toEqual(expectedValue.diseases);
    });
});