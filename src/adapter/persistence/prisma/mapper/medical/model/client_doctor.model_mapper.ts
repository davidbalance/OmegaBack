import { ClientDoctorModel } from "@omega/medical/core/model/client/client-doctor.model";
import { ClientDoctorModel as PrismaClientDoctorModel } from "@prisma/client";

export class ClientDoctorModelMapper {
    static toModel(value: PrismaClientDoctorModel): ClientDoctorModel {
        return new ClientDoctorModel({
            ...value,
            companyRuc: value.companyRuc ?? ''
        });
    }
}