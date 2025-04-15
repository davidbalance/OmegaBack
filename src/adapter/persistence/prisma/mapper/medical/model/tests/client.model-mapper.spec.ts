import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ClientModel as PrismaClientModel } from "@prisma/client";
import { ClientModelMapper } from "../client.model-mapper";

describe('ClientModelMapper', () => {
    it('should correctly map a PrismaClientModel to an ClientModel instance', () => {
        const prismaValue: Omit<PrismaClientModel, 'companyRuc'> = {
            patientId: 'id-123',
            patientDni: "123456789",
            patientGender: "male",
            patientBirthday: new Date(),
            patientName: "Patient",
            patientLastname: "Lastname",
            patientRole: null
        };

        const expectedValue = new ClientModel({
            ...prismaValue,
            companyRuc: ""
        });
        const result = ClientModelMapper.toModel(prismaValue);
        expect(result.patientId).toBe(expectedValue.patientId);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.patientGender).toBe(expectedValue.patientGender);
        expect(result.patientBirthday).toBe(expectedValue.patientBirthday);
        expect(result.patientName).toBe(expectedValue.patientName);
        expect(result.patientLastname).toBe(expectedValue.patientLastname);
        expect(result.patientRole).toBe(expectedValue.patientRole);
        expect(result.companyRuc).toBe(expectedValue.companyRuc);
    });
});
