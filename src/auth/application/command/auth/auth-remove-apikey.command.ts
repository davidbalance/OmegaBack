import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";

export type AuthRemoveApiKeyCommandPayload = {
    authId: string;
    apikeyId: string
};
export class AuthRemoveApiKeyCommand implements CommandHandlerAsync<AuthRemoveApiKeyCommandPayload, void> {
    constructor(
        private readonly repository: AuthRepository,
    ) { }

    async handleAsync(value: AuthRemoveApiKeyCommandPayload): Promise<void> {
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.authId }] });
        if (!auth) throw new AuthNotFoundError(value.authId);

        auth.removeApiKey(value.apikeyId);

        await this.repository.saveAsync(auth);
    }
}