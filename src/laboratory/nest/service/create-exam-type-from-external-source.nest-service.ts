import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeExternalSourceResolver } from "@omega/laboratory/application/resolver/exam-type-external-source.resolver";
import { CreateExamTypeFromExternalSourceService } from "@omega/laboratory/application/service/create-exam-type-from-external-source.service";
import { InjectResolver } from "../inject/resolver.inject";
import { CreateExamTypeFromExternalSourceServiceToken } from "../inject/service.inject";

@Injectable()
export class CreateExamTypeFromExternalSourceNestService
    extends CreateExamTypeFromExternalSourceService {
    constructor(
        @InjectResolver("ExamTypeExternalSource") typeResolver: ExamTypeExternalSourceResolver,
    ) {
        super(typeResolver);
    }
}

export const CreateExamTypeFromExternalSourceServiceProvider: Provider = {
    provide: CreateExamTypeFromExternalSourceServiceToken,
    useClass: CreateExamTypeFromExternalSourceNestService,
}