import { Expose, Type } from "class-transformer";
import { GETMedicalEmailResponseDto } from "./medical-email.response.dto";

export class GETMedicalClientResponseDto {
    @Expose()
    public readonly dni: string;

    @Expose()
    public readonly fullname: string;

    @Expose()
    public managementId: number;

    @Expose()
    public areaId: number;

    @Type(() => GETMedicalEmailResponseDto)
    @Expose()
    public readonly email: GETMedicalEmailResponseDto[];
}

export class GETMedicalClientArrayResponseDto {
    @Type(() => GETMedicalClientResponseDto)
    @Expose()
    public readonly clients: GETMedicalClientResponseDto[]
}

export class GETMedicalClientManagementAreaResponseDto {
    @Expose()
    public managementId?: number;

    @Expose()
    public areaId?: number;
}

export class POSTMedicalClientManagementAreaResponseDto {
    @Expose()
    public managementId?: number;

    @Expose()
    public areaId?: number;
}

export class DELETEMedicalClientManagementAreaResponseDto {}

export class POSTMedicalClientResponseDto extends GETMedicalClientResponseDto { }