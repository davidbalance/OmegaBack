import { DoctorOptionModel } from "@omega/profile/core/model/user/doctor-option.model";
import { DoctorOptionModel as PrismaDoctorOptionModel } from "@prisma/client";
import { DoctorOptionModelMapper } from "../doctor-option.model-mapper";

describe('DoctorOptionModelMapper', () => {
    it('should correctly map a PrismaDoctorOptionModel to an DoctorOptionModel instance', () => {
        const prismaValue: PrismaDoctorOptionModel = {
            doctorLabel: 'Doctor',
            doctorValue: 'doctor-value',
        };

        const expectedValue = new DoctorOptionModel({ ...prismaValue });
        const result = DoctorOptionModelMapper.toModel(prismaValue);
        expect(result.doctorLabel).toBe(expectedValue.doctorLabel);
        expect(result.doctorValue).toBe(expectedValue.doctorValue);
    });
});
