import { TestInnerModel } from "@omega/medical/core/model/test/test-inner.model";
import { TestInnerModel as PrismaTestInnerModel } from "@prisma/client";

export class TestInnerModelMapper {
    static toModel(value: PrismaTestInnerModel): TestInnerModel {
        return new TestInnerModel({ ...value });
    }
}