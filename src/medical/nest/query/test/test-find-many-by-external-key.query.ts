import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { InjectQuery, TestFindManyByExternalKeyQueryToken } from "../../inject/query.inject";
import { OrderExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { TestFindManyByExternalKeyQuery } from "@omega/medical/application/queries/test/test-find-many-by-external-key.query";
import { TestFindManyQuery } from "@omega/medical/application/queries/test/test-find-many.query";

@Injectable()
class TestFindManyByExternalKeyNestQuery extends TestFindManyByExternalKeyQuery {
    constructor(
        @InjectModelRepository("OrderExternalConnection") externalConnectionRepository: OrderExternalConnectionRepository,
        @InjectQuery("TestFindMany") testQuery: TestFindManyQuery,
    ) {
        super(externalConnectionRepository, testQuery);
    }
}

export const TestFindManyByExternalKeyQueryProvider: Provider = {
    provide: TestFindManyByExternalKeyQueryToken,
    useClass: TestFindManyByExternalKeyNestQuery
}