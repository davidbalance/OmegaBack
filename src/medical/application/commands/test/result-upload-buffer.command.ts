import { CommandHandlerAsync } from "@shared/shared/application";
import { FileOperation } from "@shared/shared/providers";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestRepository } from "../../repository/aggregate.repositories";
import { ResultFilepathRepository } from "../../repository/model.repositories";

export type ResultUploadBufferCommandPayload = {
    testId: string;
    buffer: Buffer
}
export interface ResultUploadBufferCommand extends CommandHandlerAsync<ResultUploadBufferCommandPayload, void> { }

export class ResultUploadBufferCommandImpl implements ResultUploadBufferCommand {
    constructor(
        private readonly file: FileOperation,
        private readonly repository: TestRepository,
        private readonly filepathRepository: ResultFilepathRepository
    ) { }

    async handleAsync(value: ResultUploadBufferCommandPayload): Promise<void> {
        const filepath = await this.filepathRepository.findOneAsync([{ field: 'testId', operator: 'eq', value: value.testId }])
        if (!filepath) throw new TestNotFoundError(value.testId);

        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);

        const path = await this.file.write(filepath.filepath, filepath.filename, value.buffer);
        test.addResult(path);

        await this.repository.saveAsync(test);
    }
}