import { Injectable, Provider } from "@nestjs/common";
import { DiseaseRemoveCommandImpl } from "@omega/disease/application/command/disease/disease-remove.command";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseRemoveCommandToken } from "../../inject/command.inject";

@Injectable()
class DiseaseRemoveNestCommand extends DiseaseRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("DiseaseGroup") repository: DiseaseGroupRepository
    ) {
        super(repository);
    }
}

export const DiseaseRemoveCommandProvider: Provider = {
    provide: DiseaseRemoveCommandToken,
    useClass: DiseaseRemoveNestCommand
}