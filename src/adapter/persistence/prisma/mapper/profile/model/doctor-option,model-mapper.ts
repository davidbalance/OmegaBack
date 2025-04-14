import { DoctorOptionModel } from "@omega/profile/core/model/user/doctor-option.model";
import { DoctorOptionModel as PrismaDoctorOptionModel } from "@prisma/client";

export class DoctorOptionModelMapper {
    static toModel(value: PrismaDoctorOptionModel): DoctorOptionModel {
        return new DoctorOptionModel({ ...value });
    }
}