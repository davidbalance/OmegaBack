import { TestExternalConnectionModel } from "@prisma/client";
import { TestExternalResponseDto } from "../dto/response/test-external.dto";

export class TestExternalModelMapper {
    public static toDTO(value: TestExternalConnectionModel): TestExternalResponseDto {
        return {
            testId: value.testId,
            testExternalKey: value.testExternalKey,
            testExternalOwner: value.testExternalOwner
        }
    }
}