import { Injectable, Provider } from "@nestjs/common";
import { AuthFindManyResourcesQuery } from "@omega/auth/application/query/auth/auth-find-many-resources.query";
import { AuthResourceRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { AuthFindManyResourcesQueryToken } from "../../inject/query.inject";

@Injectable()
class AuthFindManyResourcesNestQuery extends AuthFindManyResourcesQuery {
    constructor(
        @InjectModelRepository('AuthResource') repository: AuthResourceRepository,
    ) {
        super(repository);
    }
}

export const AuthFindManyResourcesQueryProvider: Provider = {
    provide: AuthFindManyResourcesQueryToken,
    useClass: AuthFindManyResourcesNestQuery
}