import { Injectable, Provider } from "@nestjs/common";
import { ExamSubtypeFindOneQueryImpl } from "@omega/laboratory/application/query/exam/exam-subtype-find-one.query";
import { ExamSubtypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamSubtypeFindOneQueryToken } from "../inject/query.inject";

@Injectable()
class ExamSubtypeFindOneNestQuery extends ExamSubtypeFindOneQueryImpl {
    constructor(
        @InjectModelRepository("ExamSubtype") repository: ExamSubtypeRepository
    ) {
        super(repository);
    }
}

export const ExamSubtypeFindOneQueryProvider: Provider = {
    provide: ExamSubtypeFindOneQueryToken,
    useClass: ExamSubtypeFindOneNestQuery
}