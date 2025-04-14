import { Injectable, Provider } from "@nestjs/common";
import { ExamSubtypeFindManyQuery } from "@omega/laboratory/application/query/exam/exam-subtype-find-many.query";
import { ExamSubtypeFindManyQueryToken } from "../inject/query.inject";
import { ExamSubtypeRepository } from "@omega/laboratory/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";

@Injectable()
class ExamSubtypeFindManyNestQuery extends ExamSubtypeFindManyQuery {
    constructor(
        @InjectModelRepository("ExamSubtype") repository: ExamSubtypeRepository
    ) {
        super(repository);
    }
}

export const ExamSubtypeFindManyQueryProvider: Provider = {
    provide: ExamSubtypeFindManyQueryToken,
    useClass: ExamSubtypeFindManyNestQuery
}