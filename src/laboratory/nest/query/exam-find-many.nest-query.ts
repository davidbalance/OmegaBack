import { Injectable, Provider } from "@nestjs/common";
import { ExamFindManyQuery } from "@omega/laboratory/application/query/exam/exam-find-many.query";
import { ExamFindManyQueryToken } from "../inject/query.inject";
import { ExamRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";

@Injectable()
class ExamFindManyNestQuery extends ExamFindManyQuery {
    constructor(
        @InjectModelRepository("Exam") repository: ExamRepository
    ) {
        super(repository);
    }
}

export const ExamFindManyQueryProvider: Provider = {
    provide: ExamFindManyQueryToken,
    useClass: ExamFindManyNestQuery
}