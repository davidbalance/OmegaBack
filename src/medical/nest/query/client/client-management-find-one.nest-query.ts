import { Injectable, Provider } from "@nestjs/common";
import { ClientManagementFindOneQuery } from "@omega/medical/application/queries/client/client-management-find-one.query";
import { ClientManagementRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientManagementFindOneQueryToken } from "../../inject/query.inject";

@Injectable()
class ClientManagementFindOneNestQuery extends ClientManagementFindOneQuery {
    constructor(
        @InjectModelRepository("ClientManagement") repository: ClientManagementRepository
    ) {
        super(repository);
    }
}

export const ClientManagementFindOneQueryProvider: Provider = {
    provide: ClientManagementFindOneQueryToken,
    useClass: ClientManagementFindOneNestQuery
}