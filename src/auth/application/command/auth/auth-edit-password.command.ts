import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { PasswordProvider } from "@shared/shared/providers/password.provider";

export type AuthEditPasswordCommandPayload = {
    email: string;
    password: string;
};
export interface AuthEditPasswordCommand extends CommandHandlerAsync<AuthEditPasswordCommandPayload, void> { }

export class AuthEditPasswordCommandImpl implements AuthEditPasswordCommand {
    constructor(
        private readonly repository: AuthRepository,
        private readonly hash: PasswordProvider
    ) { }

    async handleAsync(value: AuthEditPasswordCommandPayload): Promise<void> {
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'email', operator: 'eq', value: value.email }] });
        if (!auth) throw new AuthNotFoundError(value.email);

        const password = this.hash.hash(value.password);

        auth.updatePassword(password);

        await this.repository.saveAsync(auth);
    }
}