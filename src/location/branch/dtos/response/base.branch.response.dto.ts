import { CityResponseDto } from "@/location/city/dto/response/base.get.city.response.dto";
import { Expose, Type } from "class-transformer";

export class BranchResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => CityResponseDto)
    @Expose()
    public readonly city: CityResponseDto;
}