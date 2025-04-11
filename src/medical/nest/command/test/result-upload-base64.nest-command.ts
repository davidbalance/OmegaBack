import { Injectable, Provider } from "@nestjs/common";
import { ResultUploadBase64Command } from "@omega/medical/application/commands/test/result-upload-base64.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ResultUploadBase64CommandToken } from "../../inject/command.inject";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class ResultUploadBase64NestCommand extends ResultUploadBase64Command {
    constructor(
        @InjectFile() file: FileOperation,
        @InjectAggregateRepository("Test") repository: TestRepository,
        @InjectModelRepository('ResultFilepath') filepath: ResultFilepathRepository
    ) {
        super(file, repository, filepath);
    }
}

export const ResultUploadBase64CommandProvider: Provider = {
    provide: ResultUploadBase64CommandToken,
    useClass: ResultUploadBase64NestCommand
}