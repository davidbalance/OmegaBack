import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestFindOneQueryToken } from "../../inject/query.inject";
import { TestRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFindOneQuery } from "@omega/medical/application/queries/test/test-find-one.query";

@Injectable()
class TestFindOneNestQuery extends TestFindOneQuery {
    constructor(
        @InjectModelRepository("Test") repository: TestRepository) {
        super(repository);
    }
}

export const TestFindOneQueryProvider: Provider = {
    provide: TestFindOneQueryToken,
    useClass: TestFindOneNestQuery
}