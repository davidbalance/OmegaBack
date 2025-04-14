import { Injectable, Provider } from "@nestjs/common";
import { UserAttributeRepository } from "@omega/profile/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { UserAttributeFindOneQuery } from "@omega/profile/application/query/user/user-attribute-find-one.query";
import { UserAttributeFindOneQueryToken } from "../inject/query.inject";

@Injectable()
class UserAttributeFindOneNestQuery extends UserAttributeFindOneQuery {
    constructor(
        @InjectModelRepository("UserAttribute") repository: UserAttributeRepository
    ) {
        super(repository);
    }
}

export const UserAttributeFindOneQueryProvider: Provider = {
    provide: UserAttributeFindOneQueryToken,
    useClass: UserAttributeFindOneNestQuery
}