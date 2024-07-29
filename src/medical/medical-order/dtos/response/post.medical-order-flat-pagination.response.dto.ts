import { PaginationResponse } from "@/shared/utils/bases/base.pagination";
import { Expose, Type } from "class-transformer";
import { MedicalOrderFlatResponseDto } from "./base.medical-order-flat.response.dto";

export class PostMedicalOrderFlatPaginationResponseDto implements PaginationResponse<MedicalOrderFlatResponseDto> {
    @Expose() public readonly pages: number;

    @Type(() => MedicalOrderFlatResponseDto)
    @Expose() public readonly data: MedicalOrderFlatResponseDto[];
}
