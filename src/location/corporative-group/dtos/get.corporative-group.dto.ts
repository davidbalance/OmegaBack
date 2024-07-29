import { CorporativeGroupResponseDto } from "./corporative-group.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.response.dto";

export class GETCorporativeGroupResponseDto extends CorporativeGroupResponseDto { }

export class GETCorporativeGroupArrayResponseDto extends ObjectArrayResponse<GETCorporativeGroupResponseDto> { }
