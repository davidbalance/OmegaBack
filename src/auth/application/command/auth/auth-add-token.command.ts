import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";

export type AuthAddTokenCommandPayload = {
    authId: string;
    token: string;
};
export interface AuthAddTokenCommand extends CommandHandlerAsync<AuthAddTokenCommandPayload, void> { }

export class AuthAddTokenCommandImpl implements AuthAddTokenCommand {
    constructor(
        private readonly repository: AuthRepository,
    ) { }

    async handleAsync(value: AuthAddTokenCommandPayload): Promise<void> {
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.authId }] });
        if (!auth) throw new AuthNotFoundError(value.authId);

        auth.addToken(value.token);

        await this.repository.saveAsync(auth);
    }
}