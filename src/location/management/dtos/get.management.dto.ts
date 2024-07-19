import { ManagementResponseDto } from "./management.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";

export class GETManagementResponseDto extends ManagementResponseDto { }

export class GETManagementArrayResponseDto extends ObjectArrayResponse<ManagementResponseDto> { }