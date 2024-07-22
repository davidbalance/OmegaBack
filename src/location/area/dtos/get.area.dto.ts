import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { AreaResponseDto } from "./area.dto";
import { Expose, Type } from "class-transformer";

export class GETAreaResponseDto extends AreaResponseDto { }

export class GETAreaArrayResponseDto implements ObjectArrayResponse<AreaResponseDto> {
    @Expose()
    @Type(() => AreaResponseDto)
    public readonly data: AreaResponseDto[];
}