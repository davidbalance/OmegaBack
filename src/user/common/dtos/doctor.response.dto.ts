import { Doctor } from "@/user/doctor/entities/doctor.entity";
import { FindUserResponseDTO } from "./user.response.dto";
import { Expose, Type } from "class-transformer";

export class FindDoctorResponseDTO {
    @Expose()
    public readonly id: number

    @Expose()
    public readonly signature: string;

    @Type(() => FindUserResponseDTO)
    @Expose()
    public readonly user: FindUserResponseDTO;
}

export class FindDoctorsResponseDTO {
    @Type(() => FindDoctorResponseDTO)
    @Expose()
    public readonly doctors: FindDoctorResponseDTO[];
}

export class FindOneDoctorAndUpdateResponseDTO { }