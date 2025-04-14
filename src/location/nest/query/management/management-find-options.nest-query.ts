import { Injectable, Provider } from "@nestjs/common";
import { ManagementFindOptionsQuery } from "@omega/location/application/query/management/management-find-options.query";
import { ManagementOptionRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ManagementFindOptionsQueryToken } from "../../inject/query.inject";

@Injectable()
class ManagementFindOptionsNestQuery extends ManagementFindOptionsQuery {
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