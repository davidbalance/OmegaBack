import { Injectable, Provider } from "@nestjs/common";
import { ManagementFindManyQueryImpl } from "@omega/location/application/query/management/management-find-many.query";
import { ManagementRepository } from "@omega/location/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ManagementFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class ManagementFindManyNestQuery extends ManagementFindManyQueryImpl {
    constructor(
        @InjectModelRepository("Management") repository: ManagementRepository
    ) {
        super(repository);
    }
}

export const ManagementFindManyQueryProvider: Provider = {
    provide: ManagementFindManyQueryToken,
    useClass: ManagementFindManyNestQuery
}