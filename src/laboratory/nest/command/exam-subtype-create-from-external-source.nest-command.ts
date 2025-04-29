import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { ExamSubtypeCreateFromExternalSourceCommandToken } from "../inject/command.inject";
import { ExamSubtypeCreateFromExternalSourceCommandImpl } from "@omega/laboratory/application/command/exam/exam-subtype-create-from-external-source.command";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamSubtypeExternalConnectionRepository, ExamSubtypeRepository } from "@omega/laboratory/application/repository/model.repositories";

@Injectable()
class ExamSubtypeCreateFromExternalSourceNestCommand extends ExamSubtypeCreateFromExternalSourceCommandImpl {
    constructor(
        @InjectModelRepository('ExamSubtypeExternalConnection') externalConnectionRepository: ExamSubtypeExternalConnectionRepository,
        @InjectModelRepository('ExamSubtype') modelRepository: ExamSubtypeRepository,
        @InjectAggregateRepository("ExamType") aggregateRepository: ExamTypeRepository
    ) {
        super(
            externalConnectionRepository,
            modelRepository,
            aggregateRepository
        );
    }
}

export const ExamSubtypeCreateFromExternalSourceCommandProvider: Provider = {
    provide: ExamSubtypeCreateFromExternalSourceCommandToken,
    useClass: ExamSubtypeCreateFromExternalSourceNestCommand
}