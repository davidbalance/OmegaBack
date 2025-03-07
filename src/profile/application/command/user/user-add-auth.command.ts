import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthProvider } from "@shared/shared/providers/auth.provider";
import { UserRepository } from "../../repository/aggregate.repositories";

export type UserAddAuthCommandPayload = {
    userId: string;
    password: string;
    resources: string[];
};
export class UserAddAuthCommand implements CommandHandlerAsync<UserAddAuthCommandPayload, void> {
    constructor(
        private readonly repository: UserRepository,
        private readonly auth: AuthProvider
    ) { }

    async handleAsync(value: UserAddAuthCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);

        if (!user.email) throw new UserNotFoundError(value.userId);
        const auth = await this.auth.createAuth({ email: user.email, lastname: user.lastname, name: user.name, password: value.password });
        await this.auth.addResources({ authId: auth, resources: value.resources });
        user.addAuth(auth);
        await this.repository.saveAsync(user);
    }
}