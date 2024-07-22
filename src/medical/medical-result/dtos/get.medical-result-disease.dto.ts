import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalResultDiseaseResponse, MedicalResultReponse } from "./medical-result.dto";
import { Expose, Type } from "class-transformer";

export class GETMedicalResultDiseaseResponseDto extends MedicalResultDiseaseResponse { }

export class GETMedicalResultDiseaseArrayResponseDto implements ObjectArrayResponse<GETMedicalResultDiseaseResponseDto> {
    @Expose()
    @Type(() => GETMedicalResultDiseaseResponseDto)
    public readonly data: GETMedicalResultDiseaseResponseDto[];
}