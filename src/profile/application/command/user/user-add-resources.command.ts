import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthProvider } from "@shared/shared/providers/auth.provider";
import { UserRepository } from "../../repository/aggregate.repositories";

export type UserAddResourcesCommandPayload = {
    userId: string;
    resources: string[];
};
export class UserAddResourcesCommand implements CommandHandlerAsync<UserAddResourcesCommandPayload, void> {
    constructor(
        private readonly repository: UserRepository,
        private readonly auth: AuthProvider
    ) { }

    async handleAsync(value: UserAddResourcesCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);
        if (!user.auth) throw new UserNotFoundError(`auth`);
        await this.auth.addResources({ authId: user.auth, resources: value.resources });
    }
}