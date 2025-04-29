import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers/model.repository";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { ResultFilepathModel } from "@omega/medical/core/model/test/result-filepath.model";

export type ResultGetFilepathQueryPayload = {
    testId: string;
}

export interface ResultGetFilepathQuery extends QueryHandlerAsync<ResultGetFilepathQueryPayload, string> { }

export class ResultGetFilepathQueryImpl implements ResultGetFilepathQuery {
    constructor(
        private readonly repository: ModelRepository<ResultFilepathModel>
    ) { }

    async handleAsync(query: ResultGetFilepathQueryPayload): Promise<string> {
        const filepath = await this.repository.findOneAsync([{ field: 'testId', operator: 'eq', value: query.testId }]);
        if (!filepath) throw new TestNotFoundError(query.testId);
        return filepath.filepath;
    }
}