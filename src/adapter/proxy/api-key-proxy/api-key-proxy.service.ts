import { Injectable, Provider } from "@nestjs/common";
import { ApiKeyFindOneByValueQuery } from "@omega/auth/application/query/auth/api-key-find-by-value.query";
import { InjectQuery } from "@omega/auth/nest/inject/query.inject";
import { ApiKeyProviderToken } from "@shared/shared/nest/inject";
import { ApiKeyProvider } from "@shared/shared/providers/api-key.provider";

@Injectable()
export class ApiKeyProxyService implements ApiKeyProvider {
    constructor(
        @InjectQuery('ApiKeyFindOneByValue') private readonly apiKeyQuery: ApiKeyFindOneByValueQuery
    ) { }

    async validateApiKey(apiKey: string): Promise<string> {
        const value = await this.apiKeyQuery.handleAsync({ value: apiKey });
        return value.apiKeyName;
    }
}

export const ApiKeyProxyProvider: Provider = {
    provide: ApiKeyProviderToken,
    useClass: ApiKeyProxyService
}