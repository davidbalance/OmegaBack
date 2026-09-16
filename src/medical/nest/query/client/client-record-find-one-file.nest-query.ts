import { Injectable, Provider } from "@nestjs/common";
import { ClientRecordRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ClientRecordFindOneFileQueryToken } from "../../inject/query.inject";
import { ClientRecordFindOneFileQueryImpl } from "@omega/medical/application/queries/client/client-record-find-one-file.query";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";

@Injectable()
class ClientRecordFindOneFileNestQuery extends ClientRecordFindOneFileQueryImpl {
    constructor(
        @InjectModelRepository("ClientRecord") repository: ClientRecordRepository,
        @InjectFile() file: FileOperation
    ) {
        super(repository, file);
    }
}

export const ClientRecordFindOneFileQueryProvider: Provider = {
    provide: ClientRecordFindOneFileQueryToken,
    useClass: ClientRecordFindOneFileNestQuery
}