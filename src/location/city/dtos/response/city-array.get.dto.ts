import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { City } from "./city.base.dto";

export class GetCityArrayResponseDto implements ObjectArrayResponse<City> {
    @Type(() => City)
    @Expose() public readonly data: City[];
}