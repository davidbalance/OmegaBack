import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { JobPositionResponseDto } from "./job-position.dto";
import { Expose, Type } from "class-transformer";

export class GETJobPositionResponseDto extends JobPositionResponseDto { }

export class GETJobPositionArrayReponseDto implements ObjectArrayResponse<GETJobPositionResponseDto> {
    @Expose()
    @Type(() => GETJobPositionResponseDto)
    public readonly data: GETJobPositionResponseDto[];
}