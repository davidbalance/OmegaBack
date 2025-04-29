import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamTypeCreateFromExternalSourceCommandToken } from "../inject/command.inject";
import { ExamTypeCreateFromExternalSourceCommandImpl } from "@omega/laboratory/application/command/exam/exam-type-create-from-external-source.command";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamTypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";

@Injectable()
class ExamTypeCreateFromExternalSourceNestCommand extends ExamTypeCreateFromExternalSourceCommandImpl {
    constructor(
        @InjectModelRepository('ExamTypeExternalConnection') externalConnectionRepository: ExamTypeExternalConnectionRepository,
        @InjectAggregateRepository("ExamType") aggregateRepository: ExamTypeRepository
    ) {
        super(
            externalConnectionRepository,
            aggregateRepository
        );
    }
}

export const ExamTypeCreateFromExternalSourceCommandProvider: Provider = {
    provide: ExamTypeCreateFromExternalSourceCommandToken,
    useClass: ExamTypeCreateFromExternalSourceNestCommand
}