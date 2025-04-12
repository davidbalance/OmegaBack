import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalOrderResponseDto } from "./base.medical-order.response.dto";
import { Expose, Type } from "class-transformer";

export class GetMedicalOrderArrayResponseDto implements ObjectArrayResponse<MedicalOrderResponseDto> {
    @Expose()
    @Type(() => MedicalOrderResponseDto)
    public readonly data: MedicalOrderResponseDto[];
}