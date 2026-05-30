import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";
import { EditUserPayload } from "@omega/profile/core/domain/user/payloads/user.payload";

export type UserEditByDniCommandPayload = EditUserPayload & {
    userDni: string;
};
export interface UserEditByDniCommand extends CommandHandlerAsync<UserEditByDniCommandPayload, void> { }

export class UserEditByDniCommandImpl implements UserEditByDniCommand {
    constructor(
        private readonly repository: UserRepository,
    ) { }

    async handleAsync(value: UserEditByDniCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'dni', operator: 'eq', value: value.userDni }] });
        if (!user) throw new UserNotFoundError(value.userDni);
        user.edit(value);
        await this.repository.saveAsync(user);
    }
}