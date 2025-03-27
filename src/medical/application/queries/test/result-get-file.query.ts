import { QueryHandlerAsync } from "@shared/shared/application";
import { FileOperation } from "@shared/shared/providers";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestFileResultRepository } from "../../repository/model.repositories";
import { TestRepository } from "../../repository/aggregate.repositories";

export type ResultGetFileQueryPayload = {
    testId: string;
}
export class ResultGetFileQuery implements QueryHandlerAsync<ResultGetFileQueryPayload, Buffer> {
    constructor(
        private readonly file: FileOperation,
        private readonly repository: TestFileResultRepository,
        private readonly result: TestRepository
    ) { }

    async handleAsync(query: ResultGetFileQueryPayload): Promise<Buffer> {
        const test = await this.repository.findOneAsync([{ field: 'testId', operator: 'eq', value: query.testId }]);
        if (!test) throw new TestNotFoundError(query.testId);
        if (!test.resultHasFile) throw new TestNotFoundError(query.testId);

        try {
            console.log(test.resultFilepath);
            const buffer = await this.file.read(test.resultFilepath);
            return buffer;
        } catch (error) {
            const value = await this.result.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: query.testId }] });
            if (!value) throw new TestNotFoundError(query.testId);
            value.removeResult();
            await this.result.saveAsync(value);
            throw error;
        }
    }
}