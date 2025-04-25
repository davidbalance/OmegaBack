import { TestFileResultModel } from "@omega/medical/core/model/test/test-file-result.model";
import { TestFileResultModel as PrismaTestFileResultModel } from "@prisma/client";
import { TestFileResultModelMapper } from "../test-file-result.model-mapper";

describe('TestFileResultModelMapper', () => {
    it('should correctly map a PrismaTestFileResultModel to an TestFileResultModel instance', () => {
        const prismaValue: PrismaTestFileResultModel = {
            testId: "test-123",
            patientName: "Patient",
            patientLastname: "Lastname",
            patientDni: "1234567890",
            examName: "Exam",
            resultFilepath: "/path/to/file",
            resultHasFile: true
        };

        const expectedValue = new TestFileResultModel({ ...prismaValue });
        const result = TestFileResultModelMapper.toModel(prismaValue);

        expect(result.testId).toBe(expectedValue.testId);
        expect(result.patientName).toBe(expectedValue.patientName);
        expect(result.patientLastname).toBe(expectedValue.patientLastname);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.examName).toBe(expectedValue.examName);
        expect(result.resultFilepath).toBe(expectedValue.resultFilepath);
        expect(result.resultHasFile).toBe(expectedValue.resultHasFile);
    });
});