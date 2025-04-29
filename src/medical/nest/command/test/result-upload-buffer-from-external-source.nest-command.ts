import { Injectable, Provider } from "@nestjs/common";
import { TestExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectCommand, ResultUploadBufferFromExternalSourceCommandToken } from "../../inject/command.inject";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ResultUploadBufferFromExternalSourceCommandImpl } from "@omega/medical/application/commands/test/result-upload-buffer-from-external-source.command";
import { ResultUploadBufferCommand } from "@omega/medical/application/commands/test/result-upload-buffer.command";

@Injectable()
class ResultUploadBufferFromExternalSourceNestCommand extends ResultUploadBufferFromExternalSourceCommandImpl {
    constructor(
        @InjectModelRepository("TestExternalConnection") externalConnectionRepository: TestExternalConnectionRepository,
        @InjectCommand("ResultUploadBuffer") uploadCommand: ResultUploadBufferCommand
    ) {
        super(externalConnectionRepository, uploadCommand);
    }
}

export const ResultUploadBufferFromExternalSourceCommandProvider: Provider = {
    provide: ResultUploadBufferFromExternalSourceCommandToken,
    useClass: ResultUploadBufferFromExternalSourceNestCommand
}