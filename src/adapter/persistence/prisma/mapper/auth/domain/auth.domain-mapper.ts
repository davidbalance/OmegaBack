import { Auth } from "@omega/auth/core/domain/auth/auth.domain";
import { ApiKey as PrismaApiKey, Token as PrismaToken, AuthResource as PrismaAuthResource, Auth as PrismaAuth, Prisma } from "@prisma/client";
import { ApiKeyDomainMapper } from "./api_key.domain-mapper";
import { TokenDomainMapper } from "./token.domain-mapper";

type PrismaAuthWithApiKeysAndToken = PrismaAuth & {
    apikeys: PrismaApiKey[],
    token: PrismaToken | null | undefined,
    authResource: PrismaAuthResource[]
}

export class AuthDomainMapper {
    static toPrisma(value: Auth): Prisma.AuthUncheckedCreateInput {
        return {
            id: value.id,
            email: value.email,
            name: value.name,
            lastname: value.lastname,
            password: value.password,
        };
    }

    static toDomain(value: PrismaAuthWithApiKeysAndToken): Auth {
        return Auth.rehydrate({
            id: value.id,
            apikeys: value.apikeys.map(e => ApiKeyDomainMapper.toDomain(e)),
            logo: value.logoId,
            resources: value.authResource.map(e => e.resourceId),
            token: value.token ? TokenDomainMapper.toDomain(value.token) : null,
            email: value.email,
            name: value.name,
            lastname: value.lastname,
            password: value.password
        });
    }
}