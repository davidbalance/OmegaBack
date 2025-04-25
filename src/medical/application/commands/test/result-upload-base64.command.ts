import { CommandHandlerAsync } from "@shared/shared/application";
import { FileOperation } from "@shared/shared/providers";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestRepository } from "../../repository/aggregate.repositories";
import { ResultFilepathRepository } from "../../repository/model.repositories";

export type ResultUploadBase64CommandPayload = {
    testId: string;
    base64: string;
}
export interface ResultUploadBase64Command extends CommandHandlerAsync<ResultUploadBase64CommandPayload, void> { }

export class ResultUploadBase64CommandImpl implements ResultUploadBase64Command {
    constructor(
        private readonly file: FileOperation,
        private readonly repository: TestRepository,
        private readonly filepathRepository: ResultFilepathRepository
    ) { }

    async handleAsync(value: ResultUploadBase64CommandPayload): Promise<void> {
        const filepath = await this.filepathRepository.findOneAsync([{ field: 'testId', operator: 'eq', value: value.testId }])
        if (!filepath) throw new TestNotFoundError(value.testId);

        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);

        const base64Value = value.base64.replace(/^data:application\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Value, 'base64');
        const path = await this.file.write(filepath.filepath, filepath.filename, buffer);
        test.addResult(path);

        await this.repository.saveAsync(test);
    }
}