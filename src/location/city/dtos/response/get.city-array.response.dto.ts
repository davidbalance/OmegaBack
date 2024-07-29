import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { CityResponseDto } from "./base.get.city.response.dto";

export class GetCityArrayResponseDto implements ObjectArrayResponse<CityResponseDto> {
    @Type(() => CityResponseDto)
    @Expose() public readonly data: CityResponseDto[];
}