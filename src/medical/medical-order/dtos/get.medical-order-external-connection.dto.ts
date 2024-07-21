import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { MedicalOrderExternalConnectionResponse } from "./medical-order-external-connection.dto";

export class GETMedicalOrderExternalConnectionResponseDto extends MedicalOrderExternalConnectionResponse { }

export class GETMedicalOrderArrayExternalConnectionResponseDto extends ObjectArrayResponse<GETMedicalOrderExternalConnectionResponseDto> { }