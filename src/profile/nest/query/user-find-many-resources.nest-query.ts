import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { UserFindManyResourcesQueryToken } from "../inject/query.inject";
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { UserFindManyResourcesQueryImpl } from "@omega/profile/application/query/user/user-find-many-resources.query";
import { InjectAuth } from "@shared/shared/nest/inject";
import { AuthProvider } from "@shared/shared/providers/auth.provider";

@Injectable()
class UserFindManyResourcesNestQuery extends UserFindManyResourcesQueryImpl {
    constructor(
        @InjectModelRepository("User") repository: UserRepository,
        @InjectAuth() auth: AuthProvider
    ) {
        super(repository, auth);
    }
}

export const UserFindManyResourcesQueryProvider: Provider = {
    provide: UserFindManyResourcesQueryToken,
    useClass: UserFindManyResourcesNestQuery
}