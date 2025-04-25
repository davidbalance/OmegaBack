import { Injectable, Provider } from "@nestjs/common";
import { ExamFindOneQueryImpl } from "@omega/laboratory/application/query/exam/exam-find-one.query";
import { ExamRepository } from "@omega/laboratory/application/repository/model.repositories";
import { ExamFindOneQueryToken } from "../inject/query.inject";
import { InjectModelRepository } from "../inject/model-repository.inject";

@Injectable()
class ExamFindOneNestQuery extends ExamFindOneQueryImpl {
    constructor(
        @InjectModelRepository("Exam") repository: ExamRepository
    ) {
        super(repository);
    }
}

export const ExamFindOneQueryProvider: Provider = {
    provide: ExamFindOneQueryToken,
    useClass: ExamFindOneNestQuery
}