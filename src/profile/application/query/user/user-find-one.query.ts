import { UserModel } from "@omega/profile/core/model/user/user.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/model.repositories";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";

export type UserFindOneQueryPayload = {
    userId: string;
};
export class UserFindOneQuery implements QueryHandlerAsync<UserFindOneQueryPayload, UserModel> {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(query: UserFindOneQueryPayload): Promise<UserModel> {
        const data = await this.repository.findOneAsync([{ field: 'userId', operator: 'eq', value: query.userId }]);
        if (!data) throw new UserNotFoundError(query.userId);
        return data;
    }
}