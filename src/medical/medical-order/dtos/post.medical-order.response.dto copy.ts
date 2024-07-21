import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { MedicalOrderResponse } from "./medical-order.dto";

export class GETMedicalOrderResponseDto extends MedicalOrderResponse { }

export class GETMedicalOrderArrayResponseDto extends ObjectArrayResponse<GETMedicalOrderResponseDto> { }