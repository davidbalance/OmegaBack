import { Injectable, Provider } from "@nestjs/common";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamMoveCommandToken } from "../inject/command.inject";
import { ExamMoveCommandImpl } from "@omega/laboratory/application/command/exam/exam-move.command";

@Injectable()
class ExamMoveNestCommand extends ExamMoveCommandImpl {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamMoveCommandProvider: Provider = {
    provide: ExamMoveCommandToken,
    useClass: ExamMoveNestCommand
}