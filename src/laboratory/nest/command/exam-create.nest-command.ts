import { Injectable, Provider } from "@nestjs/common";
import { ExamCreateCommand } from "@omega/laboratory/application/command/exam/exam-create.command";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamCreateCommandToken } from "../inject/command.inject";

@Injectable()
class ExamCreateNestCommand extends ExamCreateCommand {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamCreateCommandProvider: Provider = {
    provide: ExamCreateCommandToken,
    useClass: ExamCreateNestCommand
}