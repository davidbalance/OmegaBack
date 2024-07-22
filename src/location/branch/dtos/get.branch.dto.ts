import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { BranchResponseDto } from "./branch.dto";
import { Expose, Type } from "class-transformer";

export class GETBranchResponseDto extends BranchResponseDto { }

export class GETBranchArrayResponseDto implements ObjectArrayResponse<GETBranchResponseDto> {
    @Expose()
    @Type(() => GETBranchResponseDto)
    public readonly data: GETBranchResponseDto[];
}