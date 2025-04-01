import { Injectable, Provider } from "@nestjs/common";
import { ExamFindOneByExternalKeyQueryToken } from "../inject/query.inject";
import { ExamExternalConnectionRepository, ExamRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamFindOneByExternalKeyQuery } from "@omega/laboratory/application/query/exam/exam-find-one-by-external-key.query";

@Injectable()
class ExamFindOneByExternalKeyNestQuery extends ExamFindOneByExternalKeyQuery {
    constructor(
        @InjectModelRepository("ExamExternalConnection") externalConnectionRepository: ExamExternalConnectionRepository,
        @InjectModelRepository("Exam") modelRepository: ExamRepository,
    ) {
        super(externalConnectionRepository, modelRepository);
    }
}

export const ExamFindOneByExternalKeyQueryProvider: Provider = {
    provide: ExamFindOneByExternalKeyQueryToken,
    useClass: ExamFindOneByExternalKeyNestQuery
}