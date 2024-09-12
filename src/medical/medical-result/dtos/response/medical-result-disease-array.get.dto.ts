import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { MedicalResultDisease } from "./medical-result.-disease.base.dto";

export class GetMedicalResultDiseaseArrayResponseDto implements ObjectArrayResponse<MedicalResultDisease> {
    @Expose()
    @Type(() => MedicalResultDisease)
    public readonly data: MedicalResultDisease[];
}