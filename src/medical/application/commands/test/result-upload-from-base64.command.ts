import { CommandHandlerAsync } from "@shared/shared/application";
import { FileOperation } from "@shared/shared/providers";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { TestRepository } from "../../repository/aggregate.repositories";
import { ResultFilepathRepository } from "../../repository/model.repositories";

export type ResultUploadFromBase64CommandPayload = {
    testId: string;
    base64: string;
}
export class ResultUploadFromBase64Command implements CommandHandlerAsync<ResultUploadFromBase64CommandPayload, void> {
    constructor(
        private readonly file: FileOperation,
        private readonly repository: TestRepository,
        private readonly filepathRepository: ResultFilepathRepository
    ) { }

    async handleAsync(value: ResultUploadFromBase64CommandPayload): Promise<void> {
        const filepath = await this.filepathRepository.findOneAsync([{ field: 'testId', operator: 'eq', value: value.testId }])
        if (!filepath) throw new TestNotFoundError(value.testId);

        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);
        test.addResult(filepath.filepath);

        const base64Value = value.base64.replace(/^data:application\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Value, 'base64');
        await this.file.write(filepath.filepath, filepath.filename, buffer);

        await this.repository.saveAsync(test);
    }

}