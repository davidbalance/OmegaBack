import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { UserFindOneByDniQueryToken } from "../inject/query.inject";
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { UserFindOneByDniQueryImpl } from "@omega/profile/application/query/user/user-find-one-by-dni.query";

@Injectable()
class UserFindOneByDniNestQuery extends UserFindOneByDniQueryImpl {
    constructor(
        @InjectModelRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const UserFindOneByDniQueryProvider: Provider = {
    provide: UserFindOneByDniQueryToken,
    useClass: UserFindOneByDniNestQuery
}