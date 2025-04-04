import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { InjectQuery, ResultGetFileFromExternalSourceQueryToken } from "../../inject/query.inject";
import { TestExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { ResultGetFileFromExternalSourceQuery } from "@omega/medical/application/queries/test/result-get-file-from-external-source.query";
import { ResultGetFileQuery } from "@omega/medical/application/queries/test/result-get-file.query";

@Injectable()
class ResultGetFileFromExternalSourceNestQuery extends ResultGetFileFromExternalSourceQuery {
    constructor(
        @InjectModelRepository("TestExternalConnection") externalConnectionRepository: TestExternalConnectionRepository,
        @InjectQuery("ResultGetFile") getFileQuery: ResultGetFileQuery
    ) {
        super(
            externalConnectionRepository,
            getFileQuery
        );
    }
}

export const ResultGetFileFromExternalSourceQueryProvider: Provider = {
    provide: ResultGetFileFromExternalSourceQueryToken,
    useClass: ResultGetFileFromExternalSourceNestQuery
}