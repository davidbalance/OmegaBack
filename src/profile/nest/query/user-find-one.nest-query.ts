import { Injectable, Provider } from "@nestjs/common";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { UserFindOneQueryToken } from "../inject/query.inject";
import { UserRepository } from "@omega/profile/application/repository/model.repositories";
import { UserFindOneQueryImpl } from "@omega/profile/application/query/user/user-find-one.query";

@Injectable()
class UserFindOneNestQuery extends UserFindOneQueryImpl {
    constructor(
        @InjectModelRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const UserFindOneQueryProvider: Provider = {
    provide: UserFindOneQueryToken,
    useClass: UserFindOneNestQuery
}