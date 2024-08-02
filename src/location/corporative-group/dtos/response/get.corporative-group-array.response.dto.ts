import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { CorporativeGroupResponseDto } from "./base.corporative-group.response.dto";

export class GetCorporativeGroupArrayResponseDto implements ObjectArrayResponse<CorporativeGroupResponseDto> {
    @Expose()
    @Type(() => CorporativeGroupResponseDto)
    public readonly data: CorporativeGroupResponseDto[];
}
