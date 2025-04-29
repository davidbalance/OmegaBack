import { Injectable, Provider } from "@nestjs/common";
import { DiseaseReportRemoveCommandImpl } from "@omega/medical/application/commands/test/disease-report-remove.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseReportRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class DiseaseReportRemoveNestCommand extends DiseaseReportRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("Test") repository: TestRepository
    ) {
        super(repository);
    }
}

export const DiseaseReportRemoveCommandProvider: Provider = {
    provide: DiseaseReportRemoveCommandToken,
    useClass: DiseaseReportRemoveNestCommand
}