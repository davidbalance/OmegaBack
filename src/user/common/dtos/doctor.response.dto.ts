import { FindUserResponseDTO } from "./user.response.dto";
import { Expose, Type } from "class-transformer";

class CustomUserDoctorResponseDTO extends FindUserResponseDTO {
    @Expose()
    public readonly hasCredential: boolean;
}

export class FindDoctorResponseDTO {
    @Expose()
    public readonly id: number

    @Expose()
    public readonly signature: string;

    @Type(() => CustomUserDoctorResponseDTO)
    @Expose()
    public readonly user: CustomUserDoctorResponseDTO;
}

export class FindDoctorsResponseDTO {
    @Type(() => FindDoctorResponseDTO)
    @Expose()
    public readonly doctors: FindDoctorResponseDTO[];
}

export class FindOneDoctorAndUpdateResponseDTO { }