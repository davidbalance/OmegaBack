import { Injectable, Provider } from "@nestjs/common";
import { ExamSubtypeFindOneByExternalKeyQueryToken } from "../inject/query.inject";
import { ExamSubtypeExternalConnectionRepository, ExamSubtypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamSubtypeFindOneByExternalKeyQuery } from "@omega/laboratory/application/query/exam/exam-subtype-find-one-by-external-key.query";

@Injectable()
class ExamSubtypeFindOneByExternalKeyNestQuery extends ExamSubtypeFindOneByExternalKeyQuery {
    constructor(
        @InjectModelRepository("ExamSubtypeExternalConnection") externalConnectionRepository: ExamSubtypeExternalConnectionRepository,
        @InjectModelRepository("ExamSubtype") modelRepository: ExamSubtypeRepository,
    ) {
        super(externalConnectionRepository, modelRepository);
    }
}

export const ExamSubtypeFindOneByExternalKeyQueryProvider: Provider = {
    provide: ExamSubtypeFindOneByExternalKeyQueryToken,
    useClass: ExamSubtypeFindOneByExternalKeyNestQuery
}