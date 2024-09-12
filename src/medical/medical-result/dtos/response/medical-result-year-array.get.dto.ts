import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalResultYear } from "./medical-result-year.base.dto";
import { Expose, Type } from "class-transformer";

export class GetMedicalResultYearArrayResponseDto implements ObjectArrayResponse<MedicalResultYear> {
    @Type(() => MedicalResultYear)
    @Expose() public readonly data: MedicalResultYear[];
}