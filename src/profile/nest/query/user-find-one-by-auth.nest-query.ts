import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { UserFindOneByAuthQueryToken } from "../inject/query.inject";
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { UserFindOneByAuthQueryImpl } from "@omega/profile/application/query/user/user-find-one-by-auth.query";

@Injectable()
class UserFindOneByAuthNestQuery extends UserFindOneByAuthQueryImpl {
    constructor(
        @InjectModelRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const UserFindOneByAuthQueryProvider: Provider = {
    provide: UserFindOneByAuthQueryToken,
    useClass: UserFindOneByAuthNestQuery
}