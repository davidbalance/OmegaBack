import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/aggregate.repositories";
import { Injectable, Provider } from "@nestjs/common";
import { DiseaseMoveToGroupCommandToken } from "../../inject/command.inject";
import { DiseaseMoveToGroupCommandImpl } from "@omega/disease/application/command/disease/disease-move-to-group.command";

@Injectable()
class DiseaseMoveToGroupNestCommand extends DiseaseMoveToGroupCommandImpl {
    constructor(
        @InjectAggregateRepository("DiseaseGroup") repository: DiseaseGroupRepository
    ) {
        super(repository);
    }
}

export const DiseaseMoveToGroupCommandProvider: Provider = {
    provide: DiseaseMoveToGroupCommandToken,
    useClass: DiseaseMoveToGroupNestCommand
}