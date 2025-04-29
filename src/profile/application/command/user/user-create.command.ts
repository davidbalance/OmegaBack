import { CreateUserPayload } from "@omega/profile/core/domain/user/payloads/user.payload";
import { User } from "@omega/profile/core/domain/user/user.domain";
import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthProvider } from "@shared/shared/providers/auth.provider";
import { UserRepository } from "../../repository/aggregate.repositories";
import { UserConflictError } from "@omega/profile/core/domain/user/errors/user.errors";

export type UserCreateCommandPayload = Omit<CreateUserPayload, 'email'> & {
    password: string;
    email: string;
    logo: string;
    resources: string[];
};
export interface UserCreateCommand extends CommandHandlerAsync<UserCreateCommandPayload, void> { }

export class UserCreateCommandImpl implements UserCreateCommand {
    constructor(
        private readonly repository: UserRepository,
        private readonly auth: AuthProvider
    ) { }

    async handleAsync(value: UserCreateCommandPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'dni', operator: 'eq', value: value.dni }] });
        if (exists) throw new UserConflictError(value.dni);

        const user = User.create(value);
        const auth = await this.auth.createAuth({ email: value.email, lastname: user.lastname, name: user.name, password: value.password });
        user.addAuth(auth);
        await this.repository.saveAsync(user);
        await this.auth.addResources({ authId: auth, resources: value.resources });
        await this.auth.addLogo(auth, value.logo);
    }
}