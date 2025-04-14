import { Injectable, Provider } from "@nestjs/common";
import { DiseaseGroupRemoveCommand } from "@omega/disease/application/command/disease/disease-group-remove.command";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseGroupRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class DiseaseGroupRemoveNestCommand extends DiseaseGroupRemoveCommand {
    constructor(
        @InjectAggregateRepository("DiseaseGroup") repository: DiseaseGroupRepository
    ) {
        super(repository);
    }
}

export const DiseaseGroupRemoveCommandProvider: Provider = {
    provide: DiseaseGroupRemoveCommandToken,
    useClass: DiseaseGroupRemoveNestCommand
}