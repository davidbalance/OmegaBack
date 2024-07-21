import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { MedicalResultReponse } from "./medical-result.dto";

export class GETMedicalResultResponseDto extends MedicalResultReponse { }

export class GETMedicalResultArrayResponseDto extends ObjectArrayResponse<GETMedicalResultResponseDto> { }