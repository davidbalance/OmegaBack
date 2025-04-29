import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";

export type AuthAddApiKeyCommandPayload = {
    authId: string;
    apikey: string
};
export interface AuthAddApiKeyCommand extends CommandHandlerAsync<AuthAddApiKeyCommandPayload, string> { }

export class AuthAddApiKeyCommandImpl implements AuthAddApiKeyCommand {
    constructor(
        private readonly repository: AuthRepository,
    ) { }

    async handleAsync(value: AuthAddApiKeyCommandPayload): Promise<string> {
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.authId }] });
        if (!auth) throw new AuthNotFoundError(value.authId);

        const key = auth.addApiKey(value.apikey);

        await this.repository.saveAsync(auth);
        return key;
    }
}