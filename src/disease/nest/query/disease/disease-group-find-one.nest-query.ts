import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { DiseaseGroupFindOneQueryToken } from "../../inject/query.inject";
import { DiseaseGroupFindOneQuery } from "@omega/disease/application/query/disease/disease-group-find-one.query";
import { DiseaseGroupRepository } from "@omega/disease/application/repository/model.repositories";

@Injectable()
class DiseaseGroupFindOneNestQuery extends DiseaseGroupFindOneQuery {
    constructor(
        @InjectModelRepository("DiseaseGroup") repository: DiseaseGroupRepository,
    ) {
        super(repository);
    }
}

export const DiseaseGroupFindOneQueryProvider: Provider = {
    provide: DiseaseGroupFindOneQueryToken,
    useClass: DiseaseGroupFindOneNestQuery
}