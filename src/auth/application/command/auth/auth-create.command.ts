import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";
import { CreateAuthPayload } from "@omega/auth/core/domain/auth/payloads/auth.payloads";
import { AuthConflictError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { PasswordProvider } from "@shared/shared/providers/password.provider";

export type AuthCreateCommandPayload = CreateAuthPayload;
export interface AuthCreateCommand extends CommandHandlerAsync<AuthCreateCommandPayload, string> { }

export class AuthCreateCommandImpl implements AuthCreateCommand {
    constructor(
        private readonly repository: AuthRepository,
        private readonly hash: PasswordProvider
    ) { }

    async handleAsync(value: AuthCreateCommandPayload): Promise<string> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'email', operator: 'eq', value: value.email }] });
        if (exists) throw new AuthConflictError(value.email);
        const password = this.hash.hash(value.password);

        const auth = Auth.create({ ...value, password });
        await this.repository.saveAsync(auth);
        return auth.id;
    }
}