import { Injectable, Provider } from "@nestjs/common";
import { BranchExternalConnectionRepository, BranchRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { BranchFindOneByExternalKeyQueryToken } from "../../inject/query.inject";
import { BranchFindOneByExternalKeyQuery } from "@omega/location/application/query/corporative/branch.find-one-by-external-key.query";

@Injectable()
class BranchFindOneByExternalKeyNestQuery extends BranchFindOneByExternalKeyQuery {
    constructor(
        @InjectModelRepository("BranchExternalConnection") externalConnectionRepository: BranchExternalConnectionRepository,
        @InjectModelRepository("Branch") modelRepository: BranchRepository,
    ) {
        super(externalConnectionRepository, modelRepository);
    }
}

export const BranchFindOneByExternalKeyQueryProvider: Provider = {
    provide: BranchFindOneByExternalKeyQueryToken,
    useClass: BranchFindOneByExternalKeyNestQuery
}