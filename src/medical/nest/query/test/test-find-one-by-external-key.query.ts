import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestFindOneByExternalKeyQueryToken } from "../../inject/query.inject";
import { TestExternalKeyRepository, TestRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFindOneByExternalKeyQuery } from "@omega/medical/application/queries/test/test-find-one-by-external-key.query";

@Injectable()
class TestFindOneByExternalKeyNestQuery extends TestFindOneByExternalKeyQuery {
    constructor(
        @InjectModelRepository("TestExternalConnection") externalConnectionRepository: TestExternalKeyRepository,
        @InjectModelRepository("Test") modelRepository: TestRepository,
    ) {
        super(externalConnectionRepository, modelRepository);
    }
}

export const TestFindOneByExternalKeyQueryProvider: Provider = {
    provide: TestFindOneByExternalKeyQueryToken,
    useClass: TestFindOneByExternalKeyNestQuery
}