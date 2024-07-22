import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalOrderResponse } from "./medical-order.dto";
import { Expose, Type } from "class-transformer";

export class GETMedicalOrderResponseDto extends MedicalOrderResponse { }

export class GETMedicalOrderArrayResponseDto implements ObjectArrayResponse<GETMedicalOrderResponseDto> {
    @Expose()
    @Type(() => GETMedicalOrderResponseDto)
    public readonly data: GETMedicalOrderResponseDto[];
 }