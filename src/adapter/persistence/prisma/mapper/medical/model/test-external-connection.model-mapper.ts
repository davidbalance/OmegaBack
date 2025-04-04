import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { TestExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";

export class TestExternalConnectionModelMapper {
    static toModel(value: PrismaExternalConnection): TestExternalConnectionModel {
        return new TestExternalConnectionModel({ ...value });
    }
}