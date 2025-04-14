import { ResourceModel } from "@omega/auth/core/model/resource/resource.model";
import { ResourceModel as PrismaResourceModel } from "@prisma/client";
import { ResourceModelMapper } from "../resource.model-mapper";

describe('ResourceModelMapper', () => {
    it('should correctly map a PrismaResourceModel to an ApiKeyValueModel instance', () => {
        const prismaValue: PrismaResourceModel = {
            resourceAddress: '/path/to/resource',
            resourceIcon: 'icon',
            resourceId: 'id-123',
            resourceLabel: 'Resource',
            resourceOrder: 0
        };

        const expectedValue = new ResourceModel({ ...prismaValue });
        const result = ResourceModelMapper.toModel(prismaValue);
        expect(result.resourceAddress).toBe(expectedValue.resourceAddress);
        expect(result.resourceIcon).toBe(expectedValue.resourceIcon);
        expect(result.resourceId).toBe(expectedValue.resourceId);
        expect(result.resourceLabel).toBe(expectedValue.resourceLabel);
        expect(result.resourceOrder).toBe(expectedValue.resourceOrder);
    });
});