import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeFindOneByExternalKeyQueryToken } from "../inject/query.inject";
import { ExamTypeExternalConnectionRepository, ExamTypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamTypeFindOneByExternalKeyQuery } from "@omega/laboratory/application/query/exam/exam-type-find-one-by-external-key.query";

@Injectable()
class ExamTypeFindOneByExternalKeyNestQuery extends ExamTypeFindOneByExternalKeyQuery {
    constructor(
        @InjectModelRepository("ExamSubtypeExternalConnection") externalConnectionRepository: ExamTypeExternalConnectionRepository,
        @InjectModelRepository("ExamSubtype") modelRepository: ExamTypeRepository,
    ) {
        super(externalConnectionRepository, modelRepository);
    }
}

export const ExamTypeFindOneByExternalKeyQueryProvider: Provider = {
    provide: ExamTypeFindOneByExternalKeyQueryToken,
    useClass: ExamTypeFindOneByExternalKeyNestQuery
}