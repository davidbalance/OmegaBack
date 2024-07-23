import { MedicalClientResponseDto } from "@/medical/medical-client/dtos/response/base.medical-client.response.dto";
import { MedicalResultResponseDto } from "@/medical/medical-result/dtos/response/base.medical-result.response.dto";
import { Expose, Type } from "class-transformer";

export class MedicalOrderResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly process: string;
    @Expose() public readonly createAt: Date;
    @Expose() public readonly mailStatus?: boolean;
    @Expose() public readonly orderStatus: string;

    @Type(() => MedicalClientResponseDto)
    @Expose() public readonly client: MedicalClientResponseDto;

    @Type(() => MedicalResultResponseDto)
    @Expose() public readonly results: MedicalResultResponseDto[]
}