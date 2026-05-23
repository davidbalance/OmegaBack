import { CommandHandlerAsync } from "@shared/shared/application";
import { TestNotFoundError } from "@omega/medical/core/domain/test/errors/test.errors";
import { FileOperation } from "@shared/shared/providers";
import { TestRepository } from "../../repository/aggregate.repositories";
import { ResultFilepathRepository } from "../../repository/model.repositories";

export type ReportUploadBufferCommandPayload = {
    testId: string;
    buffer: Buffer
}
export interface ReportUploadBufferCommand extends CommandHandlerAsync<ReportUploadBufferCommandPayload, void> { }

export class ReportUploadBufferCommandImpl implements ReportUploadBufferCommand {
    constructor(
        private readonly file: FileOperation,
        private readonly repository: TestRepository,
        private readonly filepathRepository: ResultFilepathRepository
    ) { }

    async handleAsync(value: ReportUploadBufferCommandPayload): Promise<void> {
        const filepath = await this.filepathRepository.findOneAsync([{ field: 'testId', operator: 'eq', value: value.testId }])
        if (!filepath) throw new TestNotFoundError(value.testId);

        const test = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.testId }] });
        if (!test) throw new TestNotFoundError(value.testId);

        const basepath = `medical_report/${filepath.patient}/${filepath.order}`;
        const filename = `${filepath.exam.toLocaleLowerCase().replaceAll(/\s/ig, '_')}.pdf`;

        const output = await this.file.write(basepath, filename, value.buffer);

        test.addReportFile(output);
        await this.repository.saveAsync(test);
    }
}