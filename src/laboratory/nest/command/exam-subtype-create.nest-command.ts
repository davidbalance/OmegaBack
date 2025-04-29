import { Injectable, Provider } from "@nestjs/common";
import { ExamSubtypeCreateCommandImpl } from "@omega/laboratory/application/command/exam/exam-subtype-create.command";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamSubtypeCreateCommandToken } from "../inject/command.inject";

@Injectable()
class ExamSubtypeCreateNestCommand extends ExamSubtypeCreateCommandImpl {
    constructor(
        @InjectAggregateRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamSubtypeCreateCommandProvider: Provider = {
    provide: ExamSubtypeCreateCommandToken,
    useClass: ExamSubtypeCreateNestCommand
}