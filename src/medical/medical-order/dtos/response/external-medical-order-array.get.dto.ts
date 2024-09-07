import { Expose, Type } from "class-transformer";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { ExternalMedicalOrder } from "./external-medical-order.base.dto";

export class GetExternalMedicalOrderArrayResponseDto implements ObjectArrayResponse<ExternalMedicalOrder> {
    @Type(() => ExternalMedicalOrder)
    @Expose() public readonly data: ExternalMedicalOrder[]
}