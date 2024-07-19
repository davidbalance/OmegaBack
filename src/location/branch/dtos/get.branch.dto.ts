import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { BranchResponseDto } from "./branch.dto";

export class GETBranchResponseDto extends BranchResponseDto { }

export class GETBranchArrayResponseDto extends ObjectArrayResponse<GETBranchResponseDto> { }