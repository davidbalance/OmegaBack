import { AuthResourceModel } from "@omega/auth/core/model/auth/auth-resource.model";
import { AuthResourceModel as PrismaAuthResourceModel } from "@prisma/client";
import { AuthResourceModelMapper } from "../auth-resource.model-mapper";

describe('AuthResourceModelMapper', () => {
    it('should correctly map a PrismaAuthResourceModel to an ApiKeyValueModel instance', () => {
        const prismaValue: PrismaAuthResourceModel = {
            authId: 'auth-id',
            resourceAddress: '/path/to/resource',
            resourceIcon: 'resource-icon',
            resourceId: 'id-123',
            resourceLabel: 'Resource Label',
            resourceOrder: 0
        };

        const expectedValue = new AuthResourceModel({ ...prismaValue });
        const result = AuthResourceModelMapper.toModel(prismaValue);
        expect(result.authId).toBe(expectedValue.authId);
        expect(result.resourceAddress).toBe(expectedValue.resourceAddress);
        expect(result.resourceIcon).toBe(expectedValue.resourceIcon);
        expect(result.resourceId).toBe(expectedValue.resourceId);
        expect(result.resourceLabel).toBe(expectedValue.resourceLabel);
    });
});