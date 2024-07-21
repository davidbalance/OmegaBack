import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { MedicalResultDiseaseResponse, MedicalResultReponse } from "./medical-result.dto";

export class GETMedicalResultDiseaseResponseDto extends MedicalResultDiseaseResponse { }

export class GETMedicalResultDiseaseArrayResponseDto extends ObjectArrayResponse<GETMedicalResultDiseaseResponseDto> { }