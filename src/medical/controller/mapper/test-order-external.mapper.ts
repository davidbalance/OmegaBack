import { TestOrderExternalResponseDto } from "../dto/response/test-external.dto";
import { TestOrderExternal } from "@omega/medical/application/service/create-many-test-from-external-source.service";
import { TestExternalModelMapper } from "./test-external.mapper";

export class TestOrderExternalModelMapper {
    public static toDTO(value: TestOrderExternal): TestOrderExternalResponseDto {
        return {
            ...value,
            tests: value.tests.map(e => TestExternalModelMapper.toDTO(e))
        }
    }
}