import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { DoctorModel as PrismaDoctorModel } from "@prisma/client";
import { DoctorModelMapper } from "../doctor.model-mapper";

describe('DoctorModelMapper', () => {
    it('should correctly map a PrismaDoctorModel to an DoctorModel instance', () => {
        const prismaValue: PrismaDoctorModel = {
            userId: "user-123",
            userDni: "1234567890",
            userEmail: "test@email.com",
            userName: "User",
            userLastname: "Lastname",
            userHasAuth: true,
            doctorSignature: "Doctor signature",
            doctorHasFile: true
        };

        const expectedValue = new DoctorModel({ ...prismaValue });
        const result = DoctorModelMapper.toModel(prismaValue);
        expect(result.userId).toBe(expectedValue.userId);
        expect(result.userDni).toBe(expectedValue.userDni);
        expect(result.userEmail).toBe(expectedValue.userEmail);
        expect(result.userName).toBe(expectedValue.userName);
        expect(result.userLastname).toBe(expectedValue.userLastname);
        expect(result.userHasAuth).toBe(expectedValue.userHasAuth);
        expect(result.doctorSignature).toBe(expectedValue.doctorSignature);
        expect(result.doctorHasFile).toBe(expectedValue.doctorHasFile);
    });
});
