import { Type, Expose } from "class-transformer";
import { DoctorResponseDto } from "./doctor.dto";

export class GETDoctorResponseDto extends DoctorResponseDto { }

export class GETDoctorArrayResponseDto {
    @Type(() => GETDoctorResponseDto)
    @Expose()
    public readonly doctors: GETDoctorResponseDto[];
}