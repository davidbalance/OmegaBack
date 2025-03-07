import { Injectable, Provider } from "@nestjs/common";
import { TestFileResultCountQueryToken } from "../../inject/query.inject";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestFileResultRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFileResultCountQuery } from "@omega/medical/application/queries/test/test-file-result-count.query";

@Injectable()
class TestFileResultCountNestQuery extends TestFileResultCountQuery {
    constructor(
        @InjectModelRepository('TestFileResult') repository: TestFileResultRepository,
    ) {
        super(repository);
    }
}

export const TestFileResultCountQueryProvider: Provider = {
    provide: TestFileResultCountQueryToken,
    useClass: TestFileResultCountNestQuery
}