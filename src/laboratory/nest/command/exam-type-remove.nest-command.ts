import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeRemoveCommandImpl } from "@omega/laboratory/application/command/exam/exam-type-remove.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamTypeRemoveCommandToken } from "../inject/command.inject";

@Injectable()
class ExamTypeRemoveNestCommand extends ExamTypeRemoveCommandImpl {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamTypeRemoveCommandProvider: Provider = {
    provide: ExamTypeRemoveCommandToken,
    useClass: ExamTypeRemoveNestCommand
}