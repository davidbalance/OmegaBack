import { AuthModel } from "@omega/auth/core/model/auth/auth.model";
import { AuthModel as PrismaAuthModel } from "@prisma/client";
import { AuthModelMapper } from "../auth.model-mapper";

describe('AuthModelMapper', () => {
    it('should correctly map a PrismaAuthModel to an ApiKeyValueModel instance', () => {
        const prismaValue: PrismaAuthModel = {
            authId: 'auth-id',
            authEmail: 'auth@email.com',
            authLastname: 'Lastname',
            authName: 'Name',
            logo: 'logo-name'
        };

        const expectedValue = new AuthModel({ ...prismaValue });
        const result = AuthModelMapper.toModel(prismaValue);
        expect(result.authId).toBe(expectedValue.authId);
        expect(result.authEmail).toBe(expectedValue.authEmail);
        expect(result.authLastname).toBe(expectedValue.authLastname);
        expect(result.authName).toBe(expectedValue.authName);
        expect(result.logo).toBe(expectedValue.logo);
    });
});