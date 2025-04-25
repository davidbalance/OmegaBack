import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestFindOneByExternalKeyQueryToken } from "../../inject/query.inject";
import { TestExternalConnectionRepository, TestRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFindOneByExternalKeyQueryImpl } from "@omega/medical/application/queries/test/test-find-one-by-external-key.query";

@Injectable()
class TestFindOneByExternalKeyNestQuery extends TestFindOneByExternalKeyQueryImpl {
    constructor(
        @InjectModelRepository("TestExternalConnection") externalConnectionRepository: TestExternalConnectionRepository,
        @InjectModelRepository("Test") modelRepository: TestRepository,
    ) {
        super(externalConnectionRepository, modelRepository);
    }
}

export const TestFindOneByExternalKeyQueryProvider: Provider = {
    provide: TestFindOneByExternalKeyQueryToken,
    useClass: TestFindOneByExternalKeyNestQuery
}