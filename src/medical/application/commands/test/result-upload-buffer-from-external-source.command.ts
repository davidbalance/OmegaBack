import { CommandHandlerAsync } from "@shared/shared/application";
import { TestExternalConnectionRepository } from "../../repository/model.repositories";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { ResultUploadBufferCommand } from "./result-upload-buffer.command";
import { TestExternalKeyNotFoundError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";

export type ResultUploadBufferFromExternalSourceCommandPayload = ExternalKeyProps & {
    buffer: Buffer
}
export interface ResultUploadBufferFromExternalSourceCommand extends CommandHandlerAsync<ResultUploadBufferFromExternalSourceCommandPayload, void> { }

export class ResultUploadBufferFromExternalSourceCommandImpl implements ResultUploadBufferFromExternalSourceCommand {
    constructor(
        private readonly externalConnectionRepository: TestExternalConnectionRepository,
        private readonly uploadCommand: ResultUploadBufferCommand
    ) { }

    async handleAsync(value: ResultUploadBufferFromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'testExternalKey', operator: 'eq', value: value.value },
            { field: 'testExternalOwner', operator: 'eq', value: value.owner },
        ]);

        if (!externalConnection) throw new TestExternalKeyNotFoundError(value.owner, value.value);

        await this.uploadCommand.handleAsync({ testId: externalConnection.testId, buffer: value.buffer });
    }
}