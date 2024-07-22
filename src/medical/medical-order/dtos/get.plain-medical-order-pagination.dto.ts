import { PaginationRequest, PaginationResponse } from "@/shared/utils/bases/base.pagination";
import { PlainMedicalOrderResponse } from "./plain-medical-order.dto";
import { Expose, Type } from "class-transformer";

export class GETPlainMedicalOrderPaginationResponseDto implements PaginationResponse<PlainMedicalOrderResponse> {
    @Expose()
    public readonly pages: number;

    @Expose()
    @Type(() => PlainMedicalOrderResponse)
    public readonly data: PlainMedicalOrderResponse[];
}

export class GETPlainMedicalOrderPaginationRequestDto extends PaginationRequest { }