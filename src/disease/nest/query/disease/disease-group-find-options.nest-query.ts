import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { DiseaseGroupOptionRepository } from "@omega/disease/application/repository/model.repositories";
import { DiseaseGroupFindOptionsQueryImpl } from "@omega/disease/application/query/disease/disease-group-find-options.query";
import { DiseaseGroupFindOptionsQueryToken } from "../../inject/query.inject";

@Injectable()
class DiseaseGroupFindOptionsNestQuery extends DiseaseGroupFindOptionsQueryImpl {
    constructor(
        @InjectModelRepository("DiseaseGroupOption") repository: DiseaseGroupOptionRepository
    ) {
        super(repository);
    }
}

export const DiseaseGroupFindOptionsQueryProvider: Provider = {
    provide: DiseaseGroupFindOptionsQueryToken,
    useClass: DiseaseGroupFindOptionsNestQuery
}