import { CommandHandlerAsync } from "@shared/shared/application";
import { FileOperation } from "@shared/shared/providers";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestRepository } from "../../repository/aggregate.repositories";
import { ResultFilepathRepository } from "../../repository/model.repositories";

export type ResultRemoveFileCommandPayload = {
    testId: string;
}
export class ResultRemoveFileCommand implements CommandHandlerAsync<ResultRemoveFileCommandPayload, void> {
    constructor(
        private readonly file: FileOperation,
        private readonly repository: TestRepository,
        private readonly filepathRepository: ResultFilepathRepository
    ) { }

    async handleAsync(value: ResultRemoveFileCommandPayload): Promise<void> {
        const filepath = await this.filepathRepository.findOneAsync([{ field: 'testId', operator: 'eq', value: value.testId }])
        if (!filepath) throw new TestNotFoundError(value.testId);

        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);

        if (test.result.filepath) {
            await this.file.remove(test.result.filepath);
            test.removeResult();
            await this.repository.saveAsync(test);
        }
    }

}