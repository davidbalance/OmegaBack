import { Injectable, Provider } from "@nestjs/common";
import { DiseaseReportCreateCommand } from "@omega/medical/application/commands/test/disease-report-create.command";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseReportCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class DiseaseReportCreateNestCommand extends DiseaseReportCreateCommand {
    constructor(
        @InjectAggregateRepository("Test") repository: TestRepository
    ) {
        super(repository);
    }
}

export const DiseaseReportCreateCommandProvider: Provider = {
    provide: DiseaseReportCreateCommandToken,
    useClass: DiseaseReportCreateNestCommand
}