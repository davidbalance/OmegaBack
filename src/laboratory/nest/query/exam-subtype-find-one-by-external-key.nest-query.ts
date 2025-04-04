import { Injectable, Provider } from "@nestjs/common";
import { ExamSubtypeFindOneByExternalKeyQueryToken, InjectQuery } from "../inject/query.inject";
import { ExamSubtypeExternalConnectionRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamSubtypeFindOneByExternalKeyQuery } from "@omega/laboratory/application/query/exam/exam-subtype-find-one-by-external-key.query";
import { ExamSubtypeFindOneQuery } from "@omega/laboratory/application/query/exam/exam-subtype-find-one.query";

@Injectable()
class ExamSubtypeFindOneByExternalKeyNestQuery extends ExamSubtypeFindOneByExternalKeyQuery {
    constructor(
        @InjectModelRepository("ExamSubtypeExternalConnection") externalConnectionRepository: ExamSubtypeExternalConnectionRepository,
        @InjectQuery("ExamSubtypeFindOne") findOneQuery: ExamSubtypeFindOneQuery,
    ) {
        super(externalConnectionRepository, findOneQuery);
    }
}

export const ExamSubtypeFindOneByExternalKeyQueryProvider: Provider = {
    provide: ExamSubtypeFindOneByExternalKeyQueryToken,
    useClass: ExamSubtypeFindOneByExternalKeyNestQuery
}