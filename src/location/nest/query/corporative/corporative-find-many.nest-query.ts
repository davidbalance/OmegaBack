import { Injectable, Provider } from "@nestjs/common";
import { CorporativeFindManyQueryImpl } from "@omega/location/application/query/corporative/corporative-find-many.query";
import { CorporativeRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { CorporativeFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class CorporativeFindManyNestQuery extends CorporativeFindManyQueryImpl {
    constructor(
        @InjectModelRepository("Corporative") repository: CorporativeRepository
    ) {
        super(repository);
    }
}

export const CorporativeFindManyQueryProvider: Provider = {
    provide: CorporativeFindManyQueryToken,
    useClass: CorporativeFindManyNestQuery
}