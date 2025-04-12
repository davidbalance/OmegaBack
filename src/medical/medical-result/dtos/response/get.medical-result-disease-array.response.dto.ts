import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { MedicalResultDiseaseResponse } from "./base.medical-result.-disease.response.dto";

export class GetMedicalResultDiseaseArrayResponseDto implements ObjectArrayResponse<MedicalResultDiseaseResponse> {
    @Expose()
    @Type(() => MedicalResultDiseaseResponse)
    public readonly data: MedicalResultDiseaseResponse[];
}