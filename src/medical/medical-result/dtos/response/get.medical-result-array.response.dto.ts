import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalResultResponseDto } from "./base.medical-result.response.dto";
import { Type, Expose } from "class-transformer";

export class GetMedicalResultArrayResponseDto implements ObjectArrayResponse<MedicalResultResponseDto> {
    @Type(() => MedicalResultResponseDto)
    @Expose() public readonly data: MedicalResultResponseDto[];
}