import { UserModel } from "@omega/profile/core/model/user/user.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/model.repositories";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";

export type UserFindOneByAuthQueryPayload = {
    authId: string;
}
export interface UserFindOneByAuthQuery extends QueryHandlerAsync<UserFindOneByAuthQueryPayload, UserModel> { }

export class UserFindOneByAuthQueryImpl implements UserFindOneByAuthQuery {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(query: UserFindOneByAuthQueryPayload): Promise<UserModel> {
        const value = await this.repository.findOneAsync([{ field: 'authId', operator: 'eq', value: query.authId }]);
        if (!value) throw new UserNotFoundError(`authId=${query.authId}`);
        return value;
    }
}