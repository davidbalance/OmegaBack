import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";

export type UserRemoveCommandPayload = {
    userId: string;
};
export class UserRemoveCommand implements CommandHandlerAsync<UserRemoveCommandPayload, void> {
    constructor(
        private readonly repository: UserRepository,
    ) { }

    async handleAsync(value: UserRemoveCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);

        user.remove();
        await this.repository.saveAsync(user);
    }
}