import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { BranchResponseDto } from "./base.branch.response.dto";

export class GetBranchArrayResponseDto implements ObjectArrayResponse<BranchResponseDto> {
    @Expose()
    @Type(() => BranchResponseDto)
    public readonly data: BranchResponseDto[];
}