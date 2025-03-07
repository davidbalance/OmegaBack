import { DiseaseEditCommand } from "@omega/disease/application/command/disease/disease-edit.command";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { DiseaseEditCommandToken } from "../../inject/command.inject";
import { Injectable, Provider } from "@nestjs/common";

@Injectable()
class DiseaseEditNestCommand extends DiseaseEditCommand {
    constructor(
        @InjectAggregateRepository("DiseaseGroup") repository: DiseaseGroupRepository
    ) {
        super(repository);
    }
}

export const DiseaseEditCommandProvider: Provider = {
    provide: DiseaseEditCommandToken,
    useClass: DiseaseEditNestCommand
}