import { TestModel } from "@omega/medical/core/model/test/test.model";
import { TestModel as PrismaTestModel } from "@prisma/client";

export class TestModelMapper {
    static toModel(value: PrismaTestModel): TestModel {
        return new TestModel({
            ...value,
            diseases: value.diseases ?? ''
        });
    }
}