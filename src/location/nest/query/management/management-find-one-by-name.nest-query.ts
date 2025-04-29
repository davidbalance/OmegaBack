import { Injectable, Provider } from "@nestjs/common";
import { ManagementFindOneByNameQueryImpl } from "@omega/location/application/query/management/management-find-one-by-name.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ManagementFindOneByNameQueryToken } from "../../inject/query.inject";
import { ManagementRepository } from "@omega/location/application/repository/model.repositories";

@Injectable()
class ManagementFindOneByNameNestQuery extends ManagementFindOneByNameQueryImpl {
    constructor(
        @InjectModelRepository("Management") repository: ManagementRepository
    ) {
        super(repository);
    }
}

export const ManagementFindOneByNameQueryProvider: Provider = {
    provide: ManagementFindOneByNameQueryToken,
    useClass: ManagementFindOneByNameNestQuery
}