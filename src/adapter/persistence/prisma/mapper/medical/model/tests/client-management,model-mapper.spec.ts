import { ClientManagementModel } from "@omega/medical/core/model/client/client-management.model";
import { ClientManagementModel as PrismaClientManagementModel } from "@prisma/client";
import { ClientManagementModelMapper } from "../client-management.model-mapper";

describe('ClientManagementModelMapper', () => {
    it('should correctly map a PrismaClientManagementModel to an ClientManagementModel instance', () => {
        const prismaValue: PrismaClientManagementModel = {
            patientDni: "123456789",
            managementId: 'management-123',
            managementName: 'Management'
        };

        const expectedValue = new ClientManagementModel({ ...prismaValue, });
        const result = ClientManagementModelMapper.toModel(prismaValue);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.managementId).toBe(expectedValue.managementId);
        expect(result.managementName).toBe(expectedValue.managementName);
    });
});
