import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { CorporativeGroupSingleResponseDto } from "./base.corporative-group-single.response.dto";

export class GetCorporativeGroupSingleArrayResponseDto implements ObjectArrayResponse<CorporativeGroupSingleResponseDto> {
    @Expose()
    @Type(() => CorporativeGroupSingleResponseDto)
    public readonly data: CorporativeGroupSingleResponseDto[];
}