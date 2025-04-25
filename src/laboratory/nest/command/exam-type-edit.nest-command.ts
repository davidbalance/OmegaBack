import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeEditCommandImpl } from "@omega/laboratory/application/command/exam/exam-type-edit.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamTypeEditCommandToken } from "../inject/command.inject";

@Injectable()
class ExamTypeEditNestCommand extends ExamTypeEditCommandImpl {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamTypeEditCommandProvider: Provider = {
    provide: ExamTypeEditCommandToken,
    useClass: ExamTypeEditNestCommand
}