import { UserModel } from "@omega/profile/core/model/user/user.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/model.repositories";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";

export type UserFindOneByDniQueryPayload = {
    userDni: string;
};
export interface UserFindOneByDniQuery extends QueryHandlerAsync<UserFindOneByDniQueryPayload, UserModel> { }

export class UserFindOneByDniQueryImpl implements UserFindOneByDniQuery {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(query: UserFindOneByDniQueryPayload): Promise<UserModel> {
        const data = await this.repository.findOneAsync([{ field: 'userDni', operator: 'eq', value: query.userDni }]);
        if (!data) throw new UserNotFoundError(query.userDni);
        return data;
    }
}