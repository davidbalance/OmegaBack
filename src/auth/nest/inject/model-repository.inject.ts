import { Inject } from "@nestjs/common";

export const ApiKeyValueModelRepositoryToken = 'ApiKeyValueModelRepository';
export const ApiKeyModelRepositoryToken = 'ApiKeyModelRepository';
export const AuthResourceModelRepositoryToken = 'AuthResourceModelRepository';
export const AuthModelRepositoryToken = 'AuthModelRepository';
export const TokenModelRepositoryToken = 'TokenModelRepository';
export const LogoModelRepositoryToken = 'LogoModelRepository';
export const ResourceModelRepositoryToken = 'ResourceModelRepository';

const repository = {
    ApiKeyValue: ApiKeyValueModelRepositoryToken,
    ApiKey: ApiKeyModelRepositoryToken,
    AuthResource: AuthResourceModelRepositoryToken,
    Auth: AuthModelRepositoryToken,
    Token: TokenModelRepositoryToken,
    Logo: LogoModelRepositoryToken,
    Resource: ResourceModelRepositoryToken,
}

export const InjectModelRepository = (token: keyof typeof repository) => Inject(repository[token]);