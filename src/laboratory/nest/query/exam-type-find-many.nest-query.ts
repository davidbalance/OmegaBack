import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeFindManyQuery } from "@omega/laboratory/application/query/exam/exam-type-find-many.query";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamTypeFindManyQueryToken } from "../inject/query.inject";
import { ExamTypeRepository } from "@omega/laboratory/application/repository/model.repositories";

@Injectable()
class ExamTypeFindManyNestQuery extends ExamTypeFindManyQuery {
    constructor(
        @InjectModelRepository("ExamType") repository: ExamTypeRepository
    ) {
        super(repository);
    }
}

export const ExamTypeFindManyQueryProvider: Provider = {
    provide: ExamTypeFindManyQueryToken,
    useClass: ExamTypeFindManyNestQuery
}