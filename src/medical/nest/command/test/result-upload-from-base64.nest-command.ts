import { Injectable, Provider } from "@nestjs/common";
import { ResultUploadFromBase64Command } from "@omega/medical/application/commands/test/result-upload-from-base64.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ResultUploadFromBase64CommandToken } from "../../inject/command.inject";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class ResultUploadFromBase64NestCommand extends ResultUploadFromBase64Command {
    constructor(
        @InjectFile() file: FileOperation,
        @InjectAggregateRepository("Test") repository: TestRepository,
        @InjectModelRepository('ResultFilepath') filepath: ResultFilepathRepository
    ) {
        super(file, repository, filepath);
    }
}

export const ResultUploadFromBase64CommandProvider: Provider = {
    provide: ResultUploadFromBase64CommandToken,
    useClass: ResultUploadFromBase64NestCommand
}