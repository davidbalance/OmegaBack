import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestFindOneQueryToken } from "../../inject/query.inject";
import { TestRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFindOneQueryImpl } from "@omega/medical/application/queries/test/test-find-one.query";

@Injectable()
class TestFindOneNestQuery extends TestFindOneQueryImpl {
    constructor(
        @InjectModelRepository("Test") repository: TestRepository) {
        super(repository);
    }
}

export const TestFindOneQueryProvider: Provider = {
    provide: TestFindOneQueryToken,
    useClass: TestFindOneNestQuery
}