import { UserResponseDto } from "@/user/user/dtos/user.dto";
import { Expose, Type } from "class-transformer";

export class GETPatientResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly birthday: Date;

    @Expose()
    public readonly gender: string;

    @Type(() => UserResponseDto)
    @Expose()
    public readonly user: UserResponseDto;
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