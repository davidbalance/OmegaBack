import { Injectable, Provider } from "@nestjs/common";
import { ClientRecordRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientRecordFindManyQueryToken } from "../../inject/query.inject";
import { ClientRecordFindManyQuery } from "@omega/medical/application/queries/client/client-record-find-many.query";

@Injectable()
class ClientRecordFindManyNestQuery extends ClientRecordFindManyQuery {
    constructor(
        @InjectModelRepository("ClientRecord") repository: ClientRecordRepository
    ) {
        super(repository);
    }
}

export const ClientRecordFindManyQueryProvider: Provider = {
    provide: ClientRecordFindManyQueryToken,
    useClass: ClientRecordFindManyNestQuery
}