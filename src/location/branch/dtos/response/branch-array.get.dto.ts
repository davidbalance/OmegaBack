import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { Branch } from "./branch.base.dto";

export class GetBranchArrayResponseDto implements ObjectArrayResponse<Branch> {
    @Type(() => Branch)
    @Expose() public readonly data: Branch[];
}