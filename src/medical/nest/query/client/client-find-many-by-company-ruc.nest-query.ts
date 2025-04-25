import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientFindManyByCompanyRucQueryToken } from "../../inject/query.inject";
import { ClientFindManyByCompanyRucQueryImpl } from "@omega/medical/application/queries/client/client-find-many-by-company-ruc.query";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class ClientFindManyByCompanyRucNestQuery extends ClientFindManyByCompanyRucQueryImpl {
    constructor(
        @InjectModelRepository("Client") repository: ClientRepository
    ) {
        super(repository);
    }
}

export const ClientFindManyByCompanyRucQueryProvider: Provider = {
    provide: ClientFindManyByCompanyRucQueryToken,
    useClass: ClientFindManyByCompanyRucNestQuery
}