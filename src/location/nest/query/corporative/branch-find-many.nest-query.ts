import { BranchRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { Injectable, Provider } from "@nestjs/common";
import { BranchFindManyQuery } from "@omega/location/application/query/corporative/branch-find-many.query";
import { BranchFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class BranchFindManyNestQuery extends BranchFindManyQuery {
    constructor(
        @InjectModelRepository("Branch") repository: BranchRepository
    ) {
        super(repository);
    }
}

export const BranchFindManyQueryProvider: Provider = {
    provide: BranchFindManyQueryToken,
    useClass: BranchFindManyNestQuery
}