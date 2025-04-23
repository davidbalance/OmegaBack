import { ApiKeyValueRepository } from "../../repository/auth/model.repositories";
import { QueryHandlerAsync } from "@shared/shared/application";
import { ApiKeyNotFoundError } from "@omega/auth/core/domain/auth/errors/api-key.errors";
import { ApiKeyValueModel } from "@omega/auth/core/model/auth/api-key-value.model";

export type ApiKeyFindOneByValueQueryPayload = {
    value: string
};
export class ApiKeyFindOneByValueQuery implements QueryHandlerAsync<ApiKeyFindOneByValueQueryPayload, ApiKeyValueModel> {
    constructor(
        private readonly repository: ApiKeyValueRepository,
    ) { }

    async handleAsync(value: ApiKeyFindOneByValueQueryPayload): Promise<ApiKeyValueModel> {
        const apikey = await this.repository.findOneAsync([{ field: 'apiKeyValue', operator: 'eq', value: value.value }]);
        if (!apikey) throw new ApiKeyNotFoundError(value.value);
        return apikey;
    }
}