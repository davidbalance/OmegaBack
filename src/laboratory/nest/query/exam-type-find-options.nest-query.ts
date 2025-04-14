import { Injectable, Provider } from "@nestjs/common";
import { ExamTypeFindOptionsQuery } from "@omega/laboratory/application/query/exam/exam-type-find-options.query";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { ExamTypeFindOptionsQueryToken } from "../inject/query.inject";
import { ExamSubtypeOptionRepository, ExamTypeOptionRepository } from "@omega/laboratory/application/repository/model.repositories";

@Injectable()
class ExamTypeFindOptionsNestQuery extends ExamTypeFindOptionsQuery {
    constructor(
        @InjectModelRepository("ExamSubtypeOption") subtype: ExamSubtypeOptionRepository,
        @InjectModelRepository("ExamTypeOption") type: ExamTypeOptionRepository,
    ) {
        super(subtype, type);
    }
}

export const ExamTypeFindOptionsQueryProvider: Provider = {
    provide: ExamTypeFindOptionsQueryToken,
    useClass: ExamTypeFindOptionsNestQuery
}