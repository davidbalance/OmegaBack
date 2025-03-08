import { Injectable, Provider } from "@nestjs/common";
import { TestCheckFileCommandToken } from "../../inject/command.inject";
import { TestCheckFileCommand } from "@omega/medical/application/commands/test/test-check-file.command";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";

@Injectable()
class TestCheckFileNestCommand extends TestCheckFileCommand {
    constructor(
        @InjectModelRepository("TestFileResult") model: TestFileResultRepository,
        @InjectAggregateRepository('Test') repository: TestRepository,
        @InjectFile() file: FileOperation
    ) {
        super(model, repository, file);
    }
}

export const TestCheckFileCommandProvider: Provider = {
    provide: TestCheckFileCommandToken,
    useClass: TestCheckFileNestCommand
}