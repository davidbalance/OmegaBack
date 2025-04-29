import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { AddAttributeToUserPayload } from "@omega/profile/core/domain/user/payloads/user.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";

export type UserAddAttributeCommandPayload = {
    userId: string;
} & AddAttributeToUserPayload;
export interface UserAddAttributeCommand extends CommandHandlerAsync<UserAddAttributeCommandPayload, void> { }

export class UserAddAttributeCommandImpl implements UserAddAttributeCommand {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(value: UserAddAttributeCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);

        user.addAttribute(value);
        await this.repository.saveAsync(user);
    }
}