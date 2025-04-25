import { Injectable, Provider } from "@nestjs/common";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { ExamCreateFromExternalSourceCommandToken } from "../inject/command.inject";
import { ExamCreateFromExternalSourceCommandImpl } from "@omega/laboratory/application/command/exam/exam-create-from-external-source.command";
import { ExamExternalConnectionRepository, ExamRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";

@Injectable()
class ExamCreateFromExternalSourceNestCommand extends ExamCreateFromExternalSourceCommandImpl {
    constructor(
        @InjectModelRepository('ExamExternalConnection') externalConnectionRepository: ExamExternalConnectionRepository,
        @InjectModelRepository('Exam') modelRepository: ExamRepository,
        @InjectAggregateRepository("ExamType") aggregateRepository: ExamTypeRepository
    ) {
        super(
            externalConnectionRepository,
            modelRepository,
            aggregateRepository
        );
    }
}

export const ExamCreateFromExternalSourceCommandProvider: Provider = {
    provide: ExamCreateFromExternalSourceCommandToken,
    useClass: ExamCreateFromExternalSourceNestCommand
}