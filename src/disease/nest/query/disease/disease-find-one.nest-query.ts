import { Injectable, Provider } from "@nestjs/common";
import { DiseaseFindOneQuery } from "@omega/disease/application/query/disease/disease-find-one.query";
import { DiseaseRepository } from "@omega/disease/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { DiseaseFindOneQueryToken } from "../../inject/query.inject";

@Injectable()
class DiseaseFindOneNestQuery extends DiseaseFindOneQuery {
    constructor(
        @InjectModelRepository("Disease") repository: DiseaseRepository
    ) {
        super(repository);
    }
}

export const DiseaseFindOneQueryProvider: Provider = {
    provide: DiseaseFindOneQueryToken,
    useClass: DiseaseFindOneNestQuery
}