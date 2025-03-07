import { Injectable, Provider } from "@nestjs/common";
import { DiseaseGroupEditCommand } from "@omega/disease/application/command/disease/disease-group-edit.command";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseGroupEditCommandToken } from "../../inject/command.inject";

@Injectable()
class DiseaseGroupEditNestCommand extends DiseaseGroupEditCommand {
    constructor(
        @InjectAggregateRepository("DiseaseGroup") repository: DiseaseGroupRepository,
    ) {
        super(repository);
    }
}

export const DiseaseGroupEditCommandProvider: Provider = {
    provide: DiseaseGroupEditCommandToken,
    useClass: DiseaseGroupEditNestCommand
}