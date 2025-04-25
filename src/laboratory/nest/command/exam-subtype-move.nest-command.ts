import { Injectable, Provider } from "@nestjs/common";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamSubtypeMoveCommandToken } from "../inject/command.inject";
import { ExamSubtypeMoveCommandImpl } from "@omega/laboratory/application/command/exam/exam-subtype-move.command";

@Injectable()
class ExamSubtypeMoveNestCommand extends ExamSubtypeMoveCommandImpl {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamSubtypeMoveCommandProvider: Provider = {
    provide: ExamSubtypeMoveCommandToken,
    useClass: ExamSubtypeMoveNestCommand
}