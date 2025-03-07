import { Injectable, Provider } from "@nestjs/common";
import { ApiKeyRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { ApiKeyFindManyQueryToken } from "../../inject/query.inject";
import { ApiKeyFindManyQuery } from "@omega/auth/application/query/auth/api-key-find-many.query";
import { InjectJwt } from "@shared/shared/nest/inject";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";

@Injectable()
class ApiKeyFindManyNestQuery extends ApiKeyFindManyQuery {
    constructor(
        @InjectJwt('Access') jwt: JwtProvider,
        @InjectModelRepository('ApiKey') repository: ApiKeyRepository,
    ) {
        super(jwt, repository);
    }
}

export const ApiKeyFindManyQueryProvider: Provider = {
    provide: ApiKeyFindManyQueryToken,
    useClass: ApiKeyFindManyNestQuery
}