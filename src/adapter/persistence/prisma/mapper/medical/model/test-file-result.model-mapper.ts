import { TestFileResultModel } from "@omega/medical/core/model/test/test-file-result.model";
import { TestFileResultModel as PrismaTestFileResultModel } from "@prisma/client";

export class TestFileResultModelMapper {
    static toModel(value: PrismaTestFileResultModel): TestFileResultModel {
        return new TestFileResultModel({ ...value });
    }
}