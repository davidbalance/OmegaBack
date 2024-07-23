import { Expose, Type } from "class-transformer";
import { GETMedicalEmailResponseDto } from "./medical-email.response.dto";

export class MedicalClientResponseDto {
    
    @Expose() public readonly dni: string;
    @Expose() public readonly fullname: string;
    @Expose() public readonly managementId: number;
    @Expose() public readonly areaId: number;

    @Type(() => GETMedicalEmailResponseDto)
    @Expose() public readonly email: GETMedicalEmailResponseDto[];
}

export class GETMedicalClientResponseDto { }

export class GETMedicalClientArrayResponseDto {
    @Type(() => GETMedicalClientResponseDto)
    @Expose()
    public readonly clients: GETMedicalClientResponseDto[]
}

export class GETMedicalClientManagementAreaResponseDto {
    @Expose()
    public managementId?: number;

    @Expose()
    public managementName?: string;

    @Expose()
    public areaId?: number;

    @Expose()
    public areaName?: string;
}

export class POSTMedicalClientManagementAreaResponseDto {
    @Expose()
    public managementId?: number;

    @Expose()
    public managementName?: string;

    @Expose()
    public areaId?: number;

    @Expose()
    public areaName?: string;
}

export class DELETEMedicalClientManagementAreaResponseDto { }

export class POSTMedicalClientResponseDto extends GETMedicalClientResponseDto { }