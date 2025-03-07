import { Injectable, Provider } from "@nestjs/common";
import { ResultRemoveFileCommand } from "@omega/medical/application/commands/test/result-remove-file.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ResultRemoveFileCommandToken } from "../../inject/command.inject";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class ResultRemoveFileNestCommand extends ResultRemoveFileCommand {
    constructor(
        @InjectFile() file: FileOperation,
        @InjectAggregateRepository("Test") repository: TestRepository,
        @InjectModelRepository("ResultFilepath") filepath: ResultFilepathRepository
    ) {
        super(file, repository, filepath);
    }
}

export const ResultRemoveFileCommandProvider: Provider = {
    provide: ResultRemoveFileCommandToken,
    useClass: ResultRemoveFileNestCommand
}