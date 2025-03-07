import { QueryHandlerAsync } from "@shared/shared/application";
import { FileOperation } from "@shared/shared/providers";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { ResultFilepathRepository } from "../../repository/model.repositories";
import { TestRepository } from "../../repository/aggregate.repositories";

export type ResultGetFileQueryPayload = {
    testId: string;
}
export class ResultGetFileQuery implements QueryHandlerAsync<ResultGetFileQueryPayload, Buffer> {
    constructor(
        private readonly file: FileOperation,
        private readonly repository: ResultFilepathRepository,
        private readonly result: TestRepository
    ) { }

    async handleAsync(query: ResultGetFileQueryPayload): Promise<Buffer> {
        const filepath = await this.repository.findOneAsync([{ field: 'testId', operator: 'eq', value: query.testId }]);
        if (!filepath) throw new TestNotFoundError(query.testId);

        try {
            const buffer = await this.file.read(filepath.path);
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