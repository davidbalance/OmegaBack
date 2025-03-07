import { Injectable, Provider } from "@nestjs/common";
import { ReportRemoveContentCommand } from "@omega/medical/application/commands/test/report-remove-content.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ReportRemoveContentCommandToken } from "../../inject/command.inject";

@Injectable()
class ReportRemoveContentNestCommand extends ReportRemoveContentCommand {
    constructor(
        @InjectAggregateRepository("Test") repository: TestRepository
    ) {
        super(repository);
    }
}

export const ReportRemoveContentCommandProvider: Provider = {
    provide: ReportRemoveContentCommandToken,
    useClass: ReportRemoveContentNestCommand
}