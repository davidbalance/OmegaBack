import { GetMedicalResultResponseDto } from "@/medical/medical-result/dtos/response/get.medical-result.response.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
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

    @Type(() => GetMedicalResultResponseDto)
    @Expose() public readonly results: GetMedicalResultResponseDto[]
}

export class GETMedicalOrderExternalConnectionResponseDto extends MedicalOrderExternalConnectionResponse { }

export class GETMedicalOrderArrayExternalConnectionResponseDto implements ObjectArrayResponse<GETMedicalOrderExternalConnectionResponseDto> {
    @Expose()
    @Type(() => GETMedicalOrderExternalConnectionResponseDto)
    public readonly data: GETMedicalOrderExternalConnectionResponseDto[];
}