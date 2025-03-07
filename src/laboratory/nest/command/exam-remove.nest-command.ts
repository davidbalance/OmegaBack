import { Injectable, Provider } from "@nestjs/common";
import { ExamRemoveCommand } from "@omega/laboratory/application/command/exam/exam-remove.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamRemoveCommandToken } from "../inject/command.inject";

@Injectable()
class ExamRemoveNestCommand extends ExamRemoveCommand {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamRemoveCommandProvider: Provider = {
    provide: ExamRemoveCommandToken,
    useClass: ExamRemoveNestCommand
}