import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { Area } from "./area.base.dto";

export class GetAreaArrayResponseDto implements ObjectArrayResponse<Area> {
    @Expose()
    @Type(() => Area)
    public readonly data: Area[];
}