import { Injectable, Provider } from "@nestjs/common";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ReportUploadBufferCommandToken } from "../../inject/command.inject";
import { ReportUploadBufferCommand } from "@omega/medical/application/commands/test/report-upload-buffer.command";
import { FileOperation } from "@shared/shared/providers";
import { InjectFile } from "@shared/shared/nest/inject";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";

@Injectable()
class ReportUploadBufferNestCommand extends ReportUploadBufferCommand {
    constructor(
        @InjectFile() file: FileOperation,
        @InjectAggregateRepository("Test") repository: TestRepository,
        @InjectModelRepository('ResultFilepath') filepath: ResultFilepathRepository
    ) {
        super(file, repository, filepath);
    }
}

export const ReportUploadBufferCommandProvider: Provider = {
    provide: ReportUploadBufferCommandToken,
    useClass: ReportUploadBufferNestCommand
}