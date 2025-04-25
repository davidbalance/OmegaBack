import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ManagementFindOneQueryToken } from "../../inject/query.inject";
import { ManagementRepository } from "@omega/location/application/repository/model.repositories";
import { ManagementFindOneQueryImpl } from "@omega/location/application/query/management/management-find-one.query";

@Injectable()
class ManagementFindOneNestQuery extends ManagementFindOneQueryImpl {
    constructor(
        @InjectModelRepository("Management") repository: ManagementRepository
    ) {
        super(repository);
    }
}

export const ManagementFindOneQueryProvider: Provider = {
    provide: ManagementFindOneQueryToken,
    useClass: ManagementFindOneNestQuery
}