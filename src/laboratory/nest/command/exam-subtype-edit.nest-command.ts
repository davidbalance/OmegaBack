import { Injectable, Provider } from "@nestjs/common";
import { ExamSubtypeEditCommandImpl } from "@omega/laboratory/application/command/exam/exam-subtype-edit.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamSubtypeEditCommandToken } from "../inject/command.inject";

@Injectable()
class ExamSubtypeEditNestCommand extends ExamSubtypeEditCommandImpl {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamSubtypeEditCommandProvider: Provider = {
    provide: ExamSubtypeEditCommandToken,
    useClass: ExamSubtypeEditNestCommand
}