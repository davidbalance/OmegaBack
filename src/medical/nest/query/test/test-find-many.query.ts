import { Injectable, Provider } from "@nestjs/common";
import { TestFindManyQueryImpl } from "@omega/medical/application/queries/test/test-find-many.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { TestFindManyQueryToken } from "../../inject/query.inject";
import { TestRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class TestFindManyNestQuery extends TestFindManyQueryImpl {
    constructor(
        @InjectModelRepository("Test") repository: TestRepository) {
        super(repository);
    }
}

export const TestFindManyQueryProvider: Provider = {
    provide: TestFindManyQueryToken,
    useClass: TestFindManyNestQuery
}