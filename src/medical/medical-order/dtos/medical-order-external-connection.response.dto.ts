import { GETMedicalResultExternalConnectionResponseDto } from "@/medical/medical-result/dtos/external-connection.response.dto";
import { Expose, Type } from "class-transformer";

export class MedicalClientResponseDto {
    @Expose()
    public readonly dni: string;
    @Expose()
    public readonly fullname: string;
}

export class GETMedicalOrderExternalConnectionResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly process: string;

    @Type(() => MedicalClientResponseDto)
    @Expose()
    public readonly client: MedicalClientResponseDto;

    @Type(() => GETMedicalResultExternalConnectionResponseDto)
    @Expose()
    public readonly results: GETMedicalResultExternalConnectionResponseDto[]
}


export class GETMedicalOrderArrayExternalConnectionResponseDto {
    @Type(() => GETMedicalOrderExternalConnectionResponseDto)
    @Expose()
    public readonly orders: GETMedicalOrderExternalConnectionResponseDto[];
}