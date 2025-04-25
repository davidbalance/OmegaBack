import { Injectable, Provider } from "@nestjs/common";
import { ResultGetFileQueryImpl } from "@omega/medical/application/queries/test/result-get-file.query";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ResultGetFileQueryToken } from "../../inject/query.inject";
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { TestRepository } from "@omega/medical/application/repository/aggregate.repositories";

@Injectable()
class ResultGetFileNestQuery extends ResultGetFileQueryImpl {
    constructor(
        @InjectFile() file: FileOperation,
        @InjectModelRepository("TestFileResult") repository: TestFileResultRepository,
        @InjectAggregateRepository("Test") test: TestRepository
    ) {
        super(file, repository, test);
    }
}

export const ResultGetFileQueryProvider: Provider = {
    provide: ResultGetFileQueryToken,
    useClass: ResultGetFileNestQuery
}