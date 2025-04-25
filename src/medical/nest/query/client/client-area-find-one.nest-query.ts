import { Injectable, Provider } from "@nestjs/common";
import { ClientAreaFindOneQueryImpl } from "@omega/medical/application/queries/client/client-area-find-one.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientAreaFindOneQueryToken } from "../../inject/query.inject";
import { ClientAreaRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class ClientAreaFindOneNestQuery extends ClientAreaFindOneQueryImpl {
    constructor(
        @InjectModelRepository("ClientArea") repository: ClientAreaRepository
    ) {
        super(repository);
    }
}

export const ClientAreaFindOneQueryProvider: Provider = {
    provide: ClientAreaFindOneQueryToken,
    useClass: ClientAreaFindOneNestQuery
}