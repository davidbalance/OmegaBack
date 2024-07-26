import { MedicalClientResponseDto } from "@/medical/medical-client/dtos/response/base.medical-client.response.dto";
import { MedicalResultResponseDto } from "@/medical/medical-result/dtos/response/base.medical-result.response.dto";
import { OmitType } from "@nestjs/mapped-types";
import { Expose, Type } from "class-transformer";

export class MedicalOrderFlatResponseDto extends OmitType(MedicalClientResponseDto, ['areaId', 'managementId']) {
    @Expose() public readonly id: number;
    @Expose() public readonly mailStatus?: boolean;
    @Expose() public readonly orderStatus: string;

    @Type(() => MedicalResultResponseDto)
    @Expose() public readonly results: MedicalResultResponseDto[]
}