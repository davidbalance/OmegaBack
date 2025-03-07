import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";
import { EditUserPayload } from "@omega/profile/core/domain/user/payloads/user.payload";

export type UserEditCommandPayload = EditUserPayload & {
    userId: string;
};
export class UserEditCommand implements CommandHandlerAsync<UserEditCommandPayload, void> {
    constructor(
        private readonly repository: UserRepository,
    ) { }

    async handleAsync(value: UserEditCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);
        user.edit(value);
        await this.repository.saveAsync(user);
    }
}