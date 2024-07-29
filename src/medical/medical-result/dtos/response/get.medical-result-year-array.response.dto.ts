import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalResultYearResponseDto } from "./base.medical-result-year.response.dto";
import { Expose, Type } from "class-transformer";

export class GetMedicalResultYearArrayResponseDto implements ObjectArrayResponse<MedicalResultYearResponseDto> {
    @Type(() => MedicalResultYearResponseDto)
    @Expose() public readonly data: MedicalResultYearResponseDto[];
}