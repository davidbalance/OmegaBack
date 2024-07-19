import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { AreaResponseDto } from "./area.dto";

export class GETAreaResponseDto extends AreaResponseDto { }

export class GETAreaArrayResponseDto extends ObjectArrayResponse<AreaResponseDto> { }