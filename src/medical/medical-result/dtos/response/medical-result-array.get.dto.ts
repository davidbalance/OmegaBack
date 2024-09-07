import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalResult } from "./medical-result.base.dto";
import { Type, Expose } from "class-transformer";

export class GetMedicalResultArrayResponseDto implements ObjectArrayResponse<MedicalResult> {
    @Type(() => MedicalResult)
    @Expose() public readonly data: MedicalResult[];
}