import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeFindOneByExternalKeyQueryToken, InjectQuery } from "../inject/query.inject";
import { ExamTypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamTypeFindOneByExternalKeyQuery } from "@omega/laboratory/application/query/exam/exam-type-find-one-by-external-key.query";
import { ExamTypeFindOneQuery } from "@omega/laboratory/application/query/exam/exam-type-find-one.query";

@Injectable()
class ExamTypeFindOneByExternalKeyNestQuery extends ExamTypeFindOneByExternalKeyQuery {
    constructor(
        @InjectModelRepository("ExamTypeExternalConnection") externalConnectionRepository: ExamTypeExternalConnectionRepository,
        @InjectQuery("ExamTypeFindOne") findOneQuery: ExamTypeFindOneQuery,
    ) {
        super(externalConnectionRepository, findOneQuery);
    }
}

export const ExamTypeFindOneByExternalKeyQueryProvider: Provider = {
    provide: ExamTypeFindOneByExternalKeyQueryToken,
    useClass: ExamTypeFindOneByExternalKeyNestQuery
}