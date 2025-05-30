import { Injectable, Provider } from "@nestjs/common";
import { ClientFindOneQueryImpl } from "@omega/medical/application/queries/client/client-find-one.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientFindOneQueryToken } from "../../inject/query.inject";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class ClientFindOneNestQuery extends ClientFindOneQueryImpl {
    constructor(
        @InjectModelRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const ClientFindOneQueryProvider: Provider = {
    provide: ClientFindOneQueryToken,
    useClass: ClientFindOneNestQuery
}