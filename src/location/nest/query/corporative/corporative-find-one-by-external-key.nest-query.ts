import { Injectable, Provider } from "@nestjs/common";
import { CorporativeExternalConnectionRepository, CorporativeRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { CorporativeFindOneByExternalKeyQueryToken } from "../../inject/query.inject";
import { CorporativeFindOneByExternalKeyQueryImpl } from "@omega/location/application/query/corporative/corporative.find-one-by-external-key.query";

@Injectable()
class CorporativeFindOneByExternalKeyNestQuery extends CorporativeFindOneByExternalKeyQueryImpl {
    constructor(
        @InjectModelRepository("CorporativeExternalConnection") externalConnectionRepository: CorporativeExternalConnectionRepository,
        @InjectModelRepository("Corporative") modelRepository: CorporativeRepository,
    ) {
        super(externalConnectionRepository, modelRepository);
    }
}

export const CorporativeFindOneByExternalKeyQueryProvider: Provider = {
    provide: CorporativeFindOneByExternalKeyQueryToken,
    useClass: CorporativeFindOneByExternalKeyNestQuery
}