import { ApiKey } from "@omega/auth/core/domain/auth/api-key.domain";
import { Prisma, ApiKey as PrismaApiKey } from "@prisma/client";

export class ApiKeyDomainMapper {
    static toPrisma(value: ApiKey): Prisma.ApiKeyUncheckedCreateInput {
        return {
            id: value.id,
            name: value.keyName,
            apikey: value.apikey,
            authId: value.authId
        };
    }

    static toDomain(value: PrismaApiKey): ApiKey {
        return ApiKey.rehydrate({
            ...value,
            keyName: value.name
        });
    }
}