import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { BranchSingleResponseDto } from "./base.branch-single.response.dto";

export class GetBranchSingleArrayResponseDto implements ObjectArrayResponse<BranchSingleResponseDto> {
    @Expose()
    @Type(() => BranchSingleResponseDto)
    public readonly data: BranchSingleResponseDto[];
}