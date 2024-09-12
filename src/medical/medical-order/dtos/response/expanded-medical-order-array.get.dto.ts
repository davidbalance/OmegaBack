import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { ExapandedMedicalOrder } from "./expanded-medical-order.base.dto";

export class GetExapandedMedicalOrderResponseDto implements ObjectArrayResponse<ExapandedMedicalOrder> {
    @Type(() => ExapandedMedicalOrder)
    @Expose() public readonly data: ExapandedMedicalOrder[];
}