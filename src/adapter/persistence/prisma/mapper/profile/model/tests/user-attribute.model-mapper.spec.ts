import { UserAttributeModel } from "@omega/profile/core/model/user/user-attribute.model";
import { UserAttributeModel as PrismaUserAttributeModel } from "@prisma/client";
import { UserAttributeModelMapper } from "../user-attribute.model-mapper";

describe('UserAttributeModelMapper', () => {
    it('should correctly map a PrismaUserAttributeModel to an UserAttributeModel instance', () => {
        const prismaValue: PrismaUserAttributeModel = {
            attributeId: "attribute-123",
            attributeName: "My attribute",
            attributeValue: "attribute-value",
            userId: "user-123"
        };

        const expectedValue = new UserAttributeModel({ ...prismaValue });
        const result = UserAttributeModelMapper.toModel(prismaValue);
        expect(result.attributeId).toBe(expectedValue.attributeId);
        expect(result.attributeName).toBe(expectedValue.attributeName);
        expect(result.attributeValue).toBe(expectedValue.attributeValue);
        expect(result.userId).toBe(expectedValue.userId);
    });
});