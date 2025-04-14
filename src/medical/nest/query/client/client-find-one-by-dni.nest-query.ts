import { Injectable, Provider } from "@nestjs/common";
import { ClientFindOneByDniQuery } from "@omega/medical/application/queries/client/client-find-one-by-dni.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientFindOneByDniQueryToken } from "../../inject/query.inject";

@Injectable()
class ClientFindOneByDniNestQuery extends ClientFindOneByDniQuery {
    constructor(
        @InjectModelRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const ClientFindOneByDniQueryProvider: Provider = {
    provide: ClientFindOneByDniQueryToken,
    useClass: ClientFindOneByDniNestQuery
}