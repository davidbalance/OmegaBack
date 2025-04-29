import { Injectable, Provider } from "@nestjs/common";
import { ClientFindManyQueryImpl } from "@omega/medical/application/queries/client/client-find-many.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientFindManyQueryToken } from "../../inject/query.inject";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class ClientFindManyNestQuery extends ClientFindManyQueryImpl {
    constructor(
        @InjectModelRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const ClientFindManyQueryProvider: Provider = {
    provide: ClientFindManyQueryToken,
    useClass: ClientFindManyNestQuery
}