import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Area } from "./area.base.dto";
import { Expose, Type } from "class-transformer";

export class ExtendedAreaArray implements ObjectArrayResponse<Area> {
    @Type(() => Area)
    @Expose() public readonly data: Area[];
}