import { Injectable, Provider } from "@nestjs/common";
import { InjectCommand, ResultUploadBase64FromExternalSourceCommandToken } from "../../inject/command.inject";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { ResultUploadBase64FromExternalSourceCommandImpl } from "@omega/medical/application/commands/test/result-upload-base64-from-external-source.command";
import { ResultUploadBase64Command } from "@omega/medical/application/commands/test/result-upload-base64.command";

@Injectable()
class ResultUploadBase64FromExternalSourceNestCommand extends ResultUploadBase64FromExternalSourceCommandImpl {
    constructor(
        @InjectModelRepository("TestExternalConnection") externalConnectionRepository: TestExternalConnectionRepository,
        @InjectCommand("ResultUploadBase64") uploadCommand: ResultUploadBase64Command
    ) {
        super(
            externalConnectionRepository,
            uploadCommand
        );
    }
}

export const ResultUploadBase64FromExternalSourceCommandProvider: Provider = {
    provide: ResultUploadBase64FromExternalSourceCommandToken,
    useClass: ResultUploadBase64FromExternalSourceNestCommand
}