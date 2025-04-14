import { QueryHandlerAsync } from "@shared/shared/application";
import { TestExternalConnectionRepository } from "../../repository/model.repositories";
import { ResultGetFileQuery } from "./result-get-file.query";
import { TestExternalKeyNotFoundError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type ResultGetFileFromExternalSourceQueryPayload = ExternalKeyProps;
export class ResultGetFileFromExternalSourceQuery implements QueryHandlerAsync<ResultGetFileFromExternalSourceQueryPayload, Buffer> {
    constructor(
        private readonly externalConnectionRepository: TestExternalConnectionRepository,
        private readonly getFileQuery: ResultGetFileQuery,
    ) { }

    async handleAsync(query: ResultGetFileFromExternalSourceQueryPayload): Promise<Buffer> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'testExternalOwner', operator: 'eq', value: query.owner },
            { field: 'testExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new TestExternalKeyNotFoundError(query.owner, query.value);

        return this.getFileQuery.handleAsync({ testId: value.testId });
    }
}