import { Injectable, Provider } from "@nestjs/common";
import { ExamSubtypeRemoveCommandImpl } from "@omega/laboratory/application/command/exam/exam-subtype-remove.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamSubtypeRemoveCommandToken } from "../inject/command.inject";

@Injectable()
class ExamSubtypeRemoveNestCommand extends ExamSubtypeRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamSubtypeRemoveCommandProvider: Provider = {
    provide: ExamSubtypeRemoveCommandToken,
    useClass: ExamSubtypeRemoveNestCommand
}