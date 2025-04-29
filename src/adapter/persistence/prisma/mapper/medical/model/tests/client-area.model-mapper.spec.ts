import { ClientAreaModel } from "@omega/medical/core/model/client/client-area.model";
import { ClientAreaModel as PrismaClientAreaModel } from "@prisma/client";
import { ClientAreaModelMapper } from "../client-area.model-mapper";

describe('ClientAreaModelMapper', () => {
    it('should correctly map a PrismaClientAreaModel to an ClientAreaModel instance', () => {
        const prismaValue: PrismaClientAreaModel = {
            areaId: 'id-123',
            areaName: 'Area',
            patientDni: '1234567890'
        };

        const expectedValue = new ClientAreaModel({ ...prismaValue });
        const result = ClientAreaModelMapper.toModel(prismaValue);
        expect(result.areaId).toBe(expectedValue.areaId);
        expect(result.areaName).toBe(expectedValue.areaName);
        expect(result.patientDni).toBe(expectedValue.patientDni);
    });
});
