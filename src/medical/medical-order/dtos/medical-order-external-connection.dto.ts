import { GETMedicalResultExternalConnectionResponseDto } from "@/medical/medical-result/dtos/get.medical-result-external-connection.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { Expose, Type } from "class-transformer";

export class MedicalClientResponseDto {
    @Expose()
    public readonly dni: string;

    @Expose()
    public readonly fullname: string;
}

export class MedicalOrderExternalConnectionResponse {
    @Expose() public readonly id: number;

    @Expose() public readonly process: string;

    @Type(() => MedicalClientResponseDto)
    @Expose() public readonly client: MedicalClientResponseDto;

    @Type(() => GETMedicalResultExternalConnectionResponseDto)
    @Expose() public readonly results: GETMedicalResultExternalConnectionResponseDto[]
}

export class GETMedicalOrderExternalConnectionResponseDto extends MedicalOrderExternalConnectionResponse { }

export class GETMedicalOrderArrayExternalConnectionResponseDto extends ObjectArrayResponse<GETMedicalOrderExternalConnectionResponseDto> { }