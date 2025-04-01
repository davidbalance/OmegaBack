import { TestExternalKeyNotFoundError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestModel } from "@omega/medical/core/model/test/test.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { TestExternalKeyRepository, TestRepository } from "../../repository/model.repositories";

export type TestFindOneByExternalKeyQueryPayload = ExternalKeyProps;
export class TestFindOneByExternalKeyQuery implements QueryHandlerAsync<TestFindOneByExternalKeyQueryPayload, TestModel> {
    constructor(
        private readonly externalConnectionRepository: TestExternalKeyRepository,
        private readonly modelRepository: TestRepository,
    ) { }

    async handleAsync(query: TestFindOneByExternalKeyQueryPayload): Promise<TestModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
            { field: 'testExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new TestExternalKeyNotFoundError(query.owner, query.value);

        const test = await this.modelRepository.findOneAsync([{ field: 'testId', operator: 'eq', value: value.testId }]);
        if (!test) throw new TestNotFoundError(value.testId);

        return test;
    }
}