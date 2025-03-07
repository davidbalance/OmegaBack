import { Injectable, Provider } from "@nestjs/common";
import { CorporativeFindOptionsQuery } from "@omega/location/application/query/corporative/corporative-find-options.query";
import { CompanyOptionRepository, CorporativeOptionRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { CorporativeFindOptionsQueryToken } from "../../inject/query.inject";

@Injectable()
class CorporativeFindOptionsNestQuery extends CorporativeFindOptionsQuery {
    constructor(
        @InjectModelRepository("CompanyOption") company: CompanyOptionRepository,
        @InjectModelRepository("CorporativeOption") corporative: CorporativeOptionRepository,
    ) {
        super(company, corporative);
    }
}

export const CorporativeFindOptionsQueryProvider: Provider = {
    provide: CorporativeFindOptionsQueryToken,
    useClass: CorporativeFindOptionsNestQuery
}