import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";
import { JobPositionResponseDto } from "./job-position.dto";

export class GETJobPositionResponseDto extends JobPositionResponseDto { }

export class GETJobPositionArrayReponseDto extends ObjectArrayResponse<GETJobPositionResponseDto> { }