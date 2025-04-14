import { CommandHandlerAsync } from "@shared/shared/application";
import { TestExternalConnectionRepository } from "../../repository/model.repositories";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { TestExternalKeyNotFoundError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";
import { ResultUploadBase64Command } from "./result-upload-base64.command";

export type ResultUploadBase64FromExternalSourceCommandPayload = ExternalKeyProps & {
    base64: string
}
export class ResultUploadBase64FromExternalSourceCommand implements CommandHandlerAsync<ResultUploadBase64FromExternalSourceCommandPayload, void> {
    constructor(
        private readonly externalConnectionRepository: TestExternalConnectionRepository,
        private readonly uploadCommand: ResultUploadBase64Command
    ) { }

    async handleAsync(value: ResultUploadBase64FromExternalSourceCommandPayload): Promise<void> {
        const externalConnection = await this.externalConnectionRepository.findOneAsync([
            { field: 'testExternalKey', operator: 'eq', value: value.value },
            { field: 'testExternalOwner', operator: 'eq', value: value.owner },
        ]);

        if (!externalConnection) throw new TestExternalKeyNotFoundError(value.owner, value.value);

        await this.uploadCommand.handleAsync({ testId: externalConnection.testId, base64: value.base64 });
    }
}