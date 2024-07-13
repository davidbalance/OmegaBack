import { GETUserResponseDto } from "@/user/user/dtos/user.response.dto";
import { Expose, Type } from "class-transformer";

export class GETPatientResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly birthday: Date;

    @Expose()
    public readonly gender: string;

    @Type(() => GETUserResponseDto)
    @Expose()
    public readonly user: GETUserResponseDto;
}

export class GETPatientArrayResponseDto {
    @Type(() => GETPatientResponseDto)
    @Expose()
    public readonly patients: GETPatientResponseDto[];
}

export class GETPatientArrayWithPageCountResponseDto extends GETPatientArrayResponseDto {
    @Expose()
    public readonly pages: number;
}

export class POSTPatientResponseDto extends GETPatientResponseDto { }

export class PATCHPatientResponseDto extends GETPatientResponseDto { }

export class DELETEPatientResponseDto { }