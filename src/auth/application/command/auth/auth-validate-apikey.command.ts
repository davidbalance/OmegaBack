import { CommandHandlerAsync } from "@shared/shared/application";
import { ApiKeyValueRepository } from "../../repository/auth/model.repositories";
import { ApiKeyNotFoundError } from "@omega/auth/core/domain/auth/errors/api-key.errors";

export type AuthValidateApiKeyCommandPayload = {
    apiKeyValue: string
};
export interface AuthValidateApiKeyCommand extends CommandHandlerAsync<AuthValidateApiKeyCommandPayload, void> { }

export class AuthValidateApiKeyCommandImpl implements AuthValidateApiKeyCommand {
    constructor(
        private readonly repository: ApiKeyValueRepository,
    ) { }

    async handleAsync(value: AuthValidateApiKeyCommandPayload): Promise<void> {
        const auth = await this.repository.findOneAsync([{ field: 'apiKeyValue', operator: 'eq', value: value.apiKeyValue }]);
        if (!auth) throw new ApiKeyNotFoundError(value.apiKeyValue);
    }
}