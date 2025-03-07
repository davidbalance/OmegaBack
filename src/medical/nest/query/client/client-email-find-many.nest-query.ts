import { Injectable, Provider } from "@nestjs/common";
import { ClientEmailFindManyQuery } from "@omega/medical/application/queries/client/client-email-find-many.query";
import { ClientEmailRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientEmailFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class ClientEmailFindManyNestQuery extends ClientEmailFindManyQuery {
    constructor(
        @InjectModelRepository("ClientEmail") repository: ClientEmailRepository
    ) {
        super(repository);
    }
}

export const ClientEmailFindManyQueryProvider: Provider = {
    provide: ClientEmailFindManyQueryToken,
    useClass: ClientEmailFindManyNestQuery
}