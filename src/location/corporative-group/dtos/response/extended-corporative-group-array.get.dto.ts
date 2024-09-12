import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { ExtendedCorporativeGroup } from "./extended-corporative-group.base.dto";

export class GetExtendedCorporativeGroupArrayResponseDto implements ObjectArrayResponse<ExtendedCorporativeGroup> {
    @Expose()
    @Type(() => ExtendedCorporativeGroup)
    public readonly data: ExtendedCorporativeGroup[];
}
