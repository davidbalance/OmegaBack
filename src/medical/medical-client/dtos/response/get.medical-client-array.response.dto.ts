import { Expose, Type } from "class-transformer";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalClientResponseDto } from "./base.medical-client.response.dto";

export class GetMedicalClientArrayResponseDto implements ObjectArrayResponse<MedicalClientResponseDto> {
    @Type(() => MedicalClientResponseDto)
    @Expose() public readonly data: MedicalClientResponseDto[];
}