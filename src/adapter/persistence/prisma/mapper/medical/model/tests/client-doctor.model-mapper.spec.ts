import { ClientDoctorModel } from "@omega/medical/core/model/client/client-doctor.model";
import { ClientDoctorModel as PrismaClientDoctorModel } from "@prisma/client";
import { ClientDoctorModelMapper } from "../client-doctor.model-mapper";

describe('ClientDoctorModelMapper', () => {
    it('should correctly map a PrismaClientDoctorModel to an ClientDoctorModel instance', () => {
        const prismaValue: PrismaClientDoctorModel = {
            patientId: "id-123",
            patientDni: "1234567890",
            patientName: "Patient",
            patientLastname: "Lastname",
            patientBirthday: new Date(),
            patientGender: "male",
            patientRole: null,
            doctorDni: "1234567890",
            companyRuc: '0123456789001'
        };

        const expectedValue = new ClientDoctorModel({
            ...prismaValue,
            companyRuc: prismaValue.companyRuc ?? ''
        });
        const result = ClientDoctorModelMapper.toModel(prismaValue);
        expect(result.patientId).toBe(expectedValue.patientId);
        expect(result.patientDni).toBe(expectedValue.patientDni);
        expect(result.patientName).toBe(expectedValue.patientName);
        expect(result.patientLastname).toBe(expectedValue.patientLastname);
        expect(result.patientBirthday).toBe(expectedValue.patientBirthday);
        expect(result.patientGender).toBe(expectedValue.patientGender);
        expect(result.patientRole).toBe(expectedValue.patientRole);
        expect(result.doctorDni).toBe(expectedValue.doctorDni);
        expect(result.companyRuc).toBe(expectedValue.companyRuc);
    });
});
