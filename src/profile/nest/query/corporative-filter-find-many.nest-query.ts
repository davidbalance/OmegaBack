import { Injectable, Provider } from "@nestjs/common";
import { CorporativeFilterRepository } from "@omega/profile/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { CorporativeFilterFindManyQueryToken } from "../inject/query.inject";
import { CorporativeFilterFindManyQueryImpl } from "@omega/profile/application/query/user/corporative-filter-find-many.query";

@Injectable()
class CorporativeFilterFindManyNestQuery extends CorporativeFilterFindManyQueryImpl {
    constructor(
        @InjectModelRepository("CorporativeFilter") repository: CorporativeFilterRepository
    ) {
        super(repository);
    }
}

export const CorporativeFilterFindManyQueryProvider: Provider = {
    provide: CorporativeFilterFindManyQueryToken,
    useClass: CorporativeFilterFindManyNestQuery
}