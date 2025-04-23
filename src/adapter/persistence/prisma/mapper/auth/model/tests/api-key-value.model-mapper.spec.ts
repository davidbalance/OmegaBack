import { ApiKeyValueModel } from "@omega/auth/core/model/auth/api-key-value.model";
import { ApiKeyValueModel as PrismaApiKeyValueModel } from "@prisma/client";
import { ApiKeyValueModelMapper } from "../api-key-value.model-mapper";

describe('ApiKeyValueModelMapper', () => {
    it('should correctly map a PrismaApiKeyValueModel to an ApiKeyValueModel instance', () => {
        const prismaValue: PrismaApiKeyValueModel = {
            authId: 'id-123',
            apiKeyName: 'key-abc',
            apiKeyValue: 'key-123'
        };

        const expectedValue = new ApiKeyValueModel({ ...prismaValue });
        const result = ApiKeyValueModelMapper.toModel(prismaValue);
        expect(result.authId).toBe(expectedValue.authId);
        expect(result.apiKeyName).toBe(expectedValue.apiKeyName);
        expect(result.apiKeyValue).toBe(expectedValue.apiKeyValue);
    });
});
