import { Injectable, Provider } from "@nestjs/common";
import { DiseaseFindManyQueryImpl } from "@omega/disease/application/query/disease/disease-find-many.query";
import { DiseaseRepository } from "@omega/disease/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { DiseaseFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class DiseaseFindManyNestQuery extends DiseaseFindManyQueryImpl {
    constructor(
        @InjectModelRepository("Disease") repository: DiseaseRepository
    ) {
        super(repository);
    }
}

export const DiseaseFindManyQueryProvider: Provider = {
    provide: DiseaseFindManyQueryToken,
    useClass: DiseaseFindManyNestQuery
}