import { Injectable, Provider } from "@nestjs/common";
import { UserFindManyQuery } from "@omega/profile/application/query/user/user-find-many.query";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { UserFindManyQueryToken } from "../inject/query.inject";
import { UserRepository } from "@omega/profile/application/repository/model.repositories";

@Injectable()
class UserFindManyNestQuery extends UserFindManyQuery {
    constructor(
        @InjectModelRepository("User") repository: UserRepository
    ) {
        super(repository);
    }
}

export const UserFindManyQueryProvider: Provider = {
    provide: UserFindManyQueryToken,
    useClass: UserFindManyNestQuery
}