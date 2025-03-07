import { Injectable, Provider } from "@nestjs/common";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ReportUploadFromStreamCommandToken } from "../../inject/command.inject";
import { ReportUploadFromStreamCommand } from "@omega/medical/application/commands/test/report-upload-from-stream.command";
import { FileOperation } from "@shared/shared/providers";
import { InjectFile } from "@shared/shared/nest/inject";
import { ResultFilepathRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";

@Injectable()
class ReportRemoveContentNestCommand extends ReportUploadFromStreamCommand {
    constructor(
        @InjectFile() file: FileOperation,
        @InjectAggregateRepository("Test") repository: TestRepository,
        @InjectModelRepository('ResultFilepath') filepath: ResultFilepathRepository
    ) {
        super(file, repository, filepath);
    }
}

export const ReportUploadFromStreamCommandProvider: Provider = {
    provide: ReportUploadFromStreamCommandToken,
    useClass: ReportRemoveContentNestCommand
}