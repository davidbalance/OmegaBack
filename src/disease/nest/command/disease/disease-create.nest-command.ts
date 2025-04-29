import { DiseaseCreateCommandImpl } from "@omega/disease/application/command/disease/disease-create.command";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { Injectable, Provider } from "@nestjs/common";
import { DiseaseCreateCommandToken } from "../../inject/command.inject";

@Injectable()
class DiseaseCreateNestCommand extends DiseaseCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("DiseaseGroup") repository: DiseaseGroupRepository
    ) {
        super(repository);
    }
}

export const DiseaseCreateCommandProvider: Provider = {
    provide: DiseaseCreateCommandToken,
    useClass: DiseaseCreateNestCommand
}