import { Injectable, Provider } from "@nestjs/common";
import { ExamEditCommand } from "@omega/laboratory/application/command/exam/exam-edit.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamEditCommandToken } from "../inject/command.inject";

@Injectable()
class ExamEditNestCommand extends ExamEditCommand {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamEditCommandProvider: Provider = {
    provide: ExamEditCommandToken,
    useClass: ExamEditNestCommand
}