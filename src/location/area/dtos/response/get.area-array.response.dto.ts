import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { AreaResponseDto } from "./base.area.response.dto";

export class GetAreaArrayResponseDto implements ObjectArrayResponse<AreaResponseDto> {
    @Expose()
    @Type(() => AreaResponseDto)
    public readonly data: AreaResponseDto[];
}