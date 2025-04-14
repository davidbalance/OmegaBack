import { Inject } from "@nestjs/common";

export const AuthGenerateTokenQueryToken = 'AuthGenerateTokenQuery';
export const AuthIntrospectQueryToken = 'AuthIntrospect';
export const AuthFindManyResourcesQueryToken = 'AuthFindManyResources';
export const ApiKeyFindManyQueryToken = 'ApiKeyFindMany';
export const ApiKeyFindOneByValueQueryToken = 'ApiKeyFindOneByValue';
export const LogoFindManyQueryToken = 'LogoFindManyQuery';
export const ResourceFindManyQueryToken = 'ResourceFindManyQuery';
export const ResourceFindOneQueryToken = 'ResourceFindOneQuery';

const query = {
    AuthGenerateToken: AuthGenerateTokenQueryToken,
    AuthIntrospect: AuthIntrospectQueryToken,
    AuthFindManyResources: AuthFindManyResourcesQueryToken,
    ApiKeyFindMany: ApiKeyFindManyQueryToken,
    ApiKeyFindOneByValue: ApiKeyFindOneByValueQueryToken,
    LogoFindMany: LogoFindManyQueryToken,
    ResourceFindMany: ResourceFindManyQueryToken,
    ResourceFindOne: ResourceFindOneQueryToken,
}

export const InjectQuery = (token: keyof typeof query) => Inject(query[token]);