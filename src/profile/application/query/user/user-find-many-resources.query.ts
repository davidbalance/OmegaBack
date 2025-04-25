import { QueryHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/model.repositories";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { AuthProvider, AuthResource } from "@shared/shared/providers/auth.provider";

export type UserFindManyResourcesQueryPayload = {
    userId: string;
};
export interface UserFindManyResourcesQuery extends QueryHandlerAsync<UserFindManyResourcesQueryPayload, AuthResource[]> { }

export class UserFindManyResourcesQueryImpl implements UserFindManyResourcesQuery {
    constructor(
        private readonly repository: UserRepository,
        private readonly auth: AuthProvider,
    ) { }

    async handleAsync(query: UserFindManyResourcesQueryPayload): Promise<AuthResource[]> {
        const data = await this.repository.findOneAsync([{ field: 'userId', operator: 'eq', value: query.userId }]);
        if (!data) throw new UserNotFoundError(query.userId);

        const resources = await this.auth.retriveResources(data.authId);
        return resources;
    }
}