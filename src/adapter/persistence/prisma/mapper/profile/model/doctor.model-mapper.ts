import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { DoctorModel as PrismaDoctorModel } from "@prisma/client";

export class DoctorModelMapper {
    static toModel(value: PrismaDoctorModel): DoctorModel {
        return new DoctorModel({ ...value });
    }
}