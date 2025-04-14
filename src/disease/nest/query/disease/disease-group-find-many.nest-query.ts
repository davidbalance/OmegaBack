import { Injectable, Provider } from "@nestjs/common";
import { DiseaseGroupFindManyQuery } from "@omega/disease/application/query/disease/disease-group-find-many.query";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { DiseaseGroupFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class DiseaseGroupFindManyNestQuery extends DiseaseGroupFindManyQuery {
    constructor(
        @InjectModelRepository("DiseaseGroup") repository: DiseaseGroupRepository
    ) {
        super(repository);
    }
}

export const DiseaseGroupFindManyQueryProvider: Provider = {
    provide: DiseaseGroupFindManyQueryToken,
    useClass: DiseaseGroupFindManyNestQuery
}