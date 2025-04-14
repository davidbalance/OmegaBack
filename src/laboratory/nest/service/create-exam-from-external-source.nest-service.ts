import { Injectable, Provider } from "@nestjs/common";
import { ExamExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamExternalSourceResolver } from "@omega/laboratory/application/resolver/exam-external-source.resolver";
import { ExamSubtypeExternalSourceResolver } from "@omega/laboratory/application/resolver/exam-subtype-external-source.resolver";
import { ExamTypeExternalSourceResolver } from "@omega/laboratory/application/resolver/exam-type-external-source.resolver";
import { CreateExamFromExternalSourceService } from "@omega/laboratory/application/service/create-exam-from-external-source.service";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectResolver } from "../inject/resolver.inject";
import { CreateExamFromExternalSourceServiceToken } from "../inject/service.inject";

@Injectable()
export class CreateExamFromExternalSourceNestService
    extends CreateExamFromExternalSourceService {
    constructor(
        @InjectModelRepository("ExamExternalConnection") externalConnection: ExamExternalConnectionRepository,
        @InjectResolver("ExamTypeExternalSource") typeResolver: ExamTypeExternalSourceResolver,
        @InjectResolver("ExamSubtypeExternalSource") subtypeResolver: ExamSubtypeExternalSourceResolver,
        @InjectResolver("ExamExternalSource") examResolver: ExamExternalSourceResolver
    ) {
        super(
            externalConnection,
            typeResolver,
            subtypeResolver,
            examResolver
        );
    }
}

export const CreateExamFromExternalSourceServiceProvider: Provider = {
    provide: CreateExamFromExternalSourceServiceToken,
    useClass: CreateExamFromExternalSourceNestService,
}