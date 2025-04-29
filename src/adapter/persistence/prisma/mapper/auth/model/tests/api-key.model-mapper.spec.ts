import { ApiKeyModel } from "@omega/auth/core/model/auth/api-key.model";
import { ApiKeyModel as PrismaApiKeyModel } from "@prisma/client";
import { ApiKeyModelMapper } from "../api-key.model-mapper";

describe('ApiKeyModelMapper', () => {
    it('should correctly map a PrismaApiKeyModel to an ApiKeyValueModel instance', () => {
        const prismaValue: PrismaApiKeyModel = {
            authId: 'auth-123',
            apiKeyId: 'id-123',
            apiKeyName: 'key-abc',
        };

        const expectedValue = new ApiKeyModel({ ...prismaValue });
        const result = ApiKeyModelMapper.toModel(prismaValue);
        expect(result.authId).toBe(expectedValue.authId);
        expect(result.apiKeyId).toBe(expectedValue.apiKeyId);
        expect(result.apiKeyName).toBe(expectedValue.apiKeyName);
    });
});