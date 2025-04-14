import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeFindOneQuery } from "@omega/laboratory/application/query/exam/exam-type-find-one.query";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamTypeFindOneQueryToken } from "../inject/query.inject";

@Injectable()
class ExamTypeFindOneNestQuery extends ExamTypeFindOneQuery {
    constructor(
        @InjectModelRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamTypeFindOneQueryProvider: Provider = {
    provide: ExamTypeFindOneQueryToken,
    useClass: ExamTypeFindOneNestQuery
}