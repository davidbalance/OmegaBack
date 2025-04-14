import { QueryHandlerAsync } from "@shared/shared/application";
import { TestModel } from "@omega/medical/core/model/test/test.model";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestRepository } from "../../repository/model.repositories";

export type TestFindOneQueryPayload = {
    testId: string
}
export class TestFindOneQuery implements QueryHandlerAsync<TestFindOneQueryPayload, TestModel> {
    constructor(
        private readonly repository: TestRepository
    ) { }

    async handleAsync(query: TestFindOneQueryPayload): Promise<TestModel> {
        const value = await this.repository.findOneAsync([{ field: 'testId', operator: 'eq', value: query.testId }]);
        if (!value) throw new TestNotFoundError(query.testId);
        return value;
    }
}