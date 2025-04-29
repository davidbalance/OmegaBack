import { TokenModel } from "@omega/auth/core/model/auth/token.model";
import { TokenModel as PrismaTokenModel } from "@prisma/client";
import { TokenModelMapper } from "../token.model-mapper";

describe('TokenModelMapper', () => {
    it('should correctly map a PrismaTokenModel to an ApiKeyValueModel instance', () => {
        const prismaValue: PrismaTokenModel = {
            authId: 'auth-123',
            token: 'My testing token'
        };

        const expectedValue = new TokenModel({ ...prismaValue });
        const result = TokenModelMapper.toModel(prismaValue);
        expect(result.authId).toBe(expectedValue.authId);
        expect(result.token).toBe(expectedValue.token);
    });
});