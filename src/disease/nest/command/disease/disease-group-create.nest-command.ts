import { Injectable, Provider } from "@nestjs/common";
import { DiseaseGroupCreateCommandImpl } from "@omega/disease/application/command/disease/disease-group-create.command";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseGroupCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class DiseaseGroupCreateNestCommand extends DiseaseGroupCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("DiseaseGroup") repository: DiseaseGroupRepository,
    ) {
        super(repository);
    }
}

export const DiseaseGroupCreateCommandProvider: Provider = {
    provide: DiseaseGroupCreateCommandToken,
    useClass: DiseaseGroupCreateNestCommand
}