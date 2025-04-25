import { Injectable, Provider } from "@nestjs/common";
import { ReportAddContentCommandImpl } from "@omega/medical/application/commands/test/report-add-content.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ReportAddContentCommandToken } from "../../inject/command.inject";

@Injectable()
class ReportAddContentNestCommand extends ReportAddContentCommandImpl {
    constructor(
        @InjectAggregateRepository("Test") repository: TestRepository
    ) {
        super(repository);
    }
}

export const ReportAddContentCommandProvider: Provider = {
    provide: ReportAddContentCommandToken,
    useClass: ReportAddContentNestCommand
}