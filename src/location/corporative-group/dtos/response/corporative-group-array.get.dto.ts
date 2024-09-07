import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { CorporativeGroup } from "./corporative-group.base.dto";

export class GetCorporativeGroupArrayResponseDto implements ObjectArrayResponse<CorporativeGroup> {
    @Type(() => CorporativeGroup)
    @Expose() public readonly data: CorporativeGroup[];
}