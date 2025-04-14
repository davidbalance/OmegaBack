import { Injectable, Provider } from "@nestjs/common";
import { DiseaseReportEditCommand } from "@omega/medical/application/commands/test/disease-report-edit.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseReportEditCommandToken } from "../../inject/command.inject";

@Injectable()
class DiseaseReportEditNestCommand extends DiseaseReportEditCommand {
    constructor(
        @InjectAggregateRepository("Test") repository: TestRepository
    ) {
        super(repository);
    }
}

export const DiseaseReportEditCommandProvider: Provider = {
    provide: DiseaseReportEditCommandToken,
    useClass: DiseaseReportEditNestCommand
}