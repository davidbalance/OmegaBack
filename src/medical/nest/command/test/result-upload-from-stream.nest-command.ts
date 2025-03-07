import { Injectable, Provider } from "@nestjs/common";
import { ResultUploadFromStreamCommand } from "@omega/medical/application/commands/test/result-upload-from-stream.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ResultUploadFromStreamCommandToken } from "../../inject/command.inject";
import { InjectModelRepository } from "../../inject/model-repository.inject";

@Injectable()
class ResultUploadFromStreamNestCommand extends ResultUploadFromStreamCommand {
    constructor(
        @InjectFile() file: FileOperation,
        @InjectAggregateRepository("Test") repository: TestRepository,
        @InjectModelRepository('ResultFilepath') filepath: ResultFilepathRepository
    ) {
        super(file, repository, filepath);
    }
}

export const ResultUploadFromStreamCommandProvider: Provider = {
    provide: ResultUploadFromStreamCommandToken,
    useClass: ResultUploadFromStreamNestCommand
}