import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeCreateCommand } from "@omega/laboratory/application/command/exam/exam-type-create.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamTypeCreateCommandToken } from "../inject/command.inject";

@Injectable()
class ExamTypeCreateNestCommand extends ExamTypeCreateCommand {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamTypeCreateCommandProvider: Provider = {
    provide: ExamTypeCreateCommandToken,
    useClass: ExamTypeCreateNestCommand
}