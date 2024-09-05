import { Expose, Type } from "class-transformer";
import { MedicalOrderFlatResponseDto } from "./base.medical-order-flat.response.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetMedicalOrderFlatArrayResponseDto implements ObjectArrayResponse<MedicalOrderFlatResponseDto> {
    @Expose()
    @Type(() => MedicalOrderFlatResponseDto)
    public readonly data: MedicalOrderFlatResponseDto[];
}