import { Injectable, Provider } from "@nestjs/common";
import { ClientRecordRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientRecordFindOneQueryToken } from "../../inject/query.inject";
import { ClientRecordFindOneQueryImpl } from "@omega/medical/application/queries/client/client-record-find-one.query";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";

@Injectable()
class ClientRecordFindOneNestQuery extends ClientRecordFindOneQueryImpl {
    constructor(
        @InjectModelRepository("ClientRecord") repository: ClientRecordRepository,
        @InjectFile() file: FileOperation
    ) {
        super(repository, file);
    }
}

export const ClientRecordFindOneQueryProvider: Provider = {
    provide: ClientRecordFindOneQueryToken,
    useClass: ClientRecordFindOneNestQuery
}