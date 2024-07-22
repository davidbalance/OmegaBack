import { Expose, Type } from "class-transformer";
import { CorporativeGroupResponseDto } from "./corporative-group.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GETCorporativeGroupResponseDto extends CorporativeGroupResponseDto { }

export class GETCorporativeGroupArrayResponseDto implements ObjectArrayResponse<GETCorporativeGroupResponseDto> { 
    @Expose()
    @Type(() => GETCorporativeGroupResponseDto)
    public readonly data: GETCorporativeGroupResponseDto[];
}
