import { Injectable, Provider } from "@nestjs/common";
import { ClientRecordRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientRecordFindOneMetadataQueryToken } from "../../inject/query.inject";
import { ClientRecordFindOneMetadataQueryImpl } from "@omega/medical/application/queries/client/client-record-find-one-metadata.query";

@Injectable()
class ClientRecordFindOneMetadataNestQuery extends ClientRecordFindOneMetadataQueryImpl {
    constructor(
        @InjectModelRepository("ClientRecord") repository: ClientRecordRepository,
    ) {
        super(repository);
    }
}

export const ClientRecordFindOneMetadataQueryProvider: Provider = {
    provide: ClientRecordFindOneMetadataQueryToken,
    useClass: ClientRecordFindOneMetadataNestQuery
}