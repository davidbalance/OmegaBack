import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";

export type UserRemoveAttributeCommandPayload = {
    userId: string;
    attributeId: string;
};
export interface UserRemoveAttributeCommand extends CommandHandlerAsync<UserRemoveAttributeCommandPayload, void> { }

export class UserRemoveAttributeCommandImpl implements UserRemoveAttributeCommand {
    constructor(
        private readonly repository: UserRepository,
    ) { }

    async handleAsync(value: UserRemoveAttributeCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);
        user.removeAttribute(value.attributeId);
        await this.repository.saveAsync(user);
    }
}