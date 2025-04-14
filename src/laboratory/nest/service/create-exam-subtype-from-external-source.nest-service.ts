import { CreateExamSubtypeFromExternalSourceService } from "@omega/laboratory/application/service/create-exam-subtype-from-external-source.service";
import { InjectResolver } from "../inject/resolver.inject";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { Injectable, Provider } from "@nestjs/common";
import { ExamSubtypeExternalSourceResolver } from "@omega/laboratory/application/resolver/exam-subtype-external-source.resolver";
import { ExamTypeExternalSourceResolver } from "@omega/laboratory/application/resolver/exam-type-external-source.resolver";
import { ExamSubtypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { CreateExamSubtypeFromExternalSourceServiceToken } from "../inject/service.inject";

@Injectable()
export class CreateExamSubtypeFromExternalSourceNestService
    extends CreateExamSubtypeFromExternalSourceService {
    constructor(
        @InjectModelRepository("ExamSubtypeExternalConnection") externalConnection: ExamSubtypeExternalConnectionRepository,
        @InjectResolver("ExamTypeExternalSource") typeResolver: ExamTypeExternalSourceResolver,
        @InjectResolver("ExamSubtypeExternalSource") subtypeResolver: ExamSubtypeExternalSourceResolver,
    ) {
        super(
            externalConnection,
            typeResolver,
            subtypeResolver
        );
    }
}

export const CreateExamSubtypeFromExternalSourceServiceProvider: Provider = {
    provide: CreateExamSubtypeFromExternalSourceServiceToken,
    useClass: CreateExamSubtypeFromExternalSourceNestService,
}