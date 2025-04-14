import { ManagementOptionModel } from "@omega/location/core/models/management/management-option.model";
import { ManagementOptionModel as PrismaManagementOptionModel } from "@prisma/client";
import { ManagementOptionModelMapper } from "../management-option.model-mapper";

describe('ManagementOptionModelMapper', () => {
    it('should correctly map a PrismaManagementOptionModel to an ManagementOptionModel instance', () => {
        const prismaValue: PrismaManagementOptionModel = {
            managementLabel: 'Management Label',
            managementValue: 'management-123'
        };

        const expectedValue = new ManagementOptionModel({ ...prismaValue });
        const result = ManagementOptionModelMapper.toModel(prismaValue);
        expect(result.managementLabel).toBe(expectedValue.managementLabel);
        expect(result.managementValue).toBe(expectedValue.managementValue);
    });
});