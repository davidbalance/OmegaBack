import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalOrder } from "./medical-order.base.dto";
import { Expose, Type } from "class-transformer";

export class GetMedicalOrderArrayResponseDto implements ObjectArrayResponse<MedicalOrder> {
    @Expose()
    @Type(() => MedicalOrder)
    public readonly data: MedicalOrder[];
}