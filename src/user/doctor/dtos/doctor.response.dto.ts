import { GETUserResponseDto } from "@/user/user/dtos/user.response.dto";
import { Expose, Type } from "class-transformer";

export class GETDoctorResponseDto {
    @Expose()
    public readonly id: number;

    @Type(() => GETUserResponseDto)
    @Expose()
    public readonly user: GETUserResponseDto;
}

export class GETDoctorArrayResponseDto {
    @Type(() => GETDoctorResponseDto)
    @Expose()
    public readonly doctors: GETDoctorResponseDto[];
}

export class POSTDoctorResponseDto extends GETDoctorResponseDto { }

export class PATCHDoctorResponseDto extends GETDoctorResponseDto { }

export class PATCHDoctorSignatureResponseDto {}

export class DELETEDoctorResponseDto { }