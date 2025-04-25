import { Injectable, Provider } from "@nestjs/common";
import { ApiKeyValueRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ApiKeyFindOneByValueQueryImpl } from "@omega/auth/application/query/auth/api-key-find-by-value.query";
import { ApiKeyFindOneByValueQueryToken } from "../../inject/query.inject";

@Injectable()
class ApiKeyFindOneByValueNestQuery extends ApiKeyFindOneByValueQueryImpl {
    constructor(
        @InjectModelRepository('ApiKeyValue') repository: ApiKeyValueRepository,
    ) {
        super(repository);
    }
}

export const ApiKeyFindOneByValueQueryProvider: Provider = {
    provide: ApiKeyFindOneByValueQueryToken,
    useClass: ApiKeyFindOneByValueNestQuery
}