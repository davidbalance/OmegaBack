import { Injectable, Provider } from "@nestjs/common";
import { ManagementFindOptionsQueryImpl } from "@omega/location/application/query/management/management-find-options.query";
import { ManagementOptionRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ManagementFindOptionsQueryToken } from "../../inject/query.inject";

@Injectable()
class ManagementFindOptionsNestQuery extends ManagementFindOptionsQueryImpl {
    constructor(
        @InjectModelRepository("ManagementOption") repository: ManagementOptionRepository
    ) {
        super(repository);
    }
}

export const ManagementFindOptionsQueryProvider: Provider = {
    provide: ManagementFindOptionsQueryToken,
    useClass: ManagementFindOptionsNestQuery
}