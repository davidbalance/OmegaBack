import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";
import { AuthInvalidCredencialError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { PasswordProvider } from "@shared/shared/providers/password.provider";

export type AuthValidateCommandPayload = {
    email: string;
    password: string;
};
export interface AuthValidateCommand extends CommandHandlerAsync<AuthValidateCommandPayload, string> { }

export class AuthValidateCommandImpl implements AuthValidateCommand {
    constructor(
        private readonly repository: AuthRepository,
        private readonly hash: PasswordProvider
    ) { }

    async handleAsync(value: AuthValidateCommandPayload): Promise<string> {
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'email', operator: 'eq', value: value.email }] });
        if (!auth) throw new AuthInvalidCredencialError();

        if (!this.hash.compare(value.password, auth.password)) throw new AuthInvalidCredencialError();

        return auth.id;
    }
}