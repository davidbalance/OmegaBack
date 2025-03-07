import { Injectable, Provider } from "@nestjs/common";
import { ClientJobPositionFindOneQuery } from "@omega/medical/application/queries/client/client-job-position-find-one.query";
import { ClientJobPositionRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientJobPositionFindOneQueryToken } from "../../inject/query.inject";

@Injectable()
class ClientJobPositionFindOneNestQuery extends ClientJobPositionFindOneQuery {
    constructor(
        @InjectModelRepository("ClientJobPosition") repository: ClientJobPositionRepository
    ) {
        super(repository);
    }
}

export const ClientJobPositionFindOneQueryProvider: Provider = {
    provide: ClientJobPositionFindOneQueryToken,
    useClass: ClientJobPositionFindOneNestQuery
}