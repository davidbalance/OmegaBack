import { DoctorResponseDto } from "../dto/response/doctor.dto";
import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";

export class DoctorModelMapper {
    public static toDTO(value: DoctorModel): DoctorResponseDto {
        return {
            userId: value.userId,
            userDni: value.userDni,
            userEmail: value.userEmail,
            userName: value.userName,
            userLastname: value.userLastname,
            userHasAuth: value.userHasAuth,
            doctorSignature: value.doctorSignature,
            doctorHasFile: value.doctorHasFile,
        }
    }
}