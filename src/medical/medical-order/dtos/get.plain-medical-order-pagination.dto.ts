import { PaginationRequest, PaginationResponse } from "@/shared/utils/bases/base.pagination";
import { PlainMedicalOrderResponse } from "./plain-medical-order.dto";

export class GETPlainMedicalOrderPaginationResponseDto extends PaginationResponse<PlainMedicalOrderResponse> { }

export class GETPlainMedicalOrderPaginationRequestDto extends PaginationRequest { }