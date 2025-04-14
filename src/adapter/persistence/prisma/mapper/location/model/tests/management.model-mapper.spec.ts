import { ManagementModel } from "@omega/location/core/models/management/management.model";
import { ManagementModel as PrismaManagementModel } from "@prisma/client";
import { ManagementModelMapper } from "../management.model-mapper";

describe('ManagementModelMapper', () => {
    it('should correctly map a PrismaManagementModel to an ManagementModel instance', () => {
        const prismaValue: PrismaManagementModel = {
            managementId: 'id-123',
            managementName: 'management'
        };

        const expectedValue = new ManagementModel({ ...prismaValue });
        const result = ManagementModelMapper.toModel(prismaValue);
        expect(result.managementId).toBe(expectedValue.managementId);
        expect(result.managementName).toBe(expectedValue.managementName);
    });
});
