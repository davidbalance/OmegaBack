import { TestModel } from "@omega/medical/core/model/test/test.model";
import { TestResponseDto } from "../dto/response/test.dto";

export class TestModelMapper {
    public static toDTO(value: TestModel): TestResponseDto {
        return {
            testId: value.testId,
            testCheck: value.testCheck,
            resultHasFile: value.resultHasFile,
            reportHasContent: value.reportHasContent,
            orderId: value.orderId,
            examName: value.examName,
            examSubtype: value.examSubtype,
            examType: value.examType,
            diseases: [...value.diseases],
        }
    }
}