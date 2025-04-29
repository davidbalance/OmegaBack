import { Injectable, Provider } from "@nestjs/common";
import { ExamFindOneByExternalKeyQueryToken, InjectQuery } from "../inject/query.inject";
import { ExamExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamFindOneByExternalKeyQueryImpl } from "@omega/laboratory/application/query/exam/exam-find-one-by-external-key.query";
import { ExamFindOneQuery } from "@omega/laboratory/application/query/exam/exam-find-one.query";

@Injectable()
class ExamFindOneByExternalKeyNestQuery extends ExamFindOneByExternalKeyQueryImpl {
    constructor(
        @InjectModelRepository("ExamExternalConnection") externalConnectionRepository: ExamExternalConnectionRepository,
        @InjectQuery("ExamFindOne") findOneQuery: ExamFindOneQuery
    ) {
        super(externalConnectionRepository, findOneQuery);
    }
}

export const ExamFindOneByExternalKeyQueryProvider: Provider = {
    provide: ExamFindOneByExternalKeyQueryToken,
    useClass: ExamFindOneByExternalKeyNestQuery
}