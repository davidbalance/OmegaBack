import { GETCityResponseDto } from "@/location/city/dto/city.response.dto";
import { Expose, Type } from "class-transformer";

export class BranchResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => GETCityResponseDto)
    @Expose()
    public readonly city: GETCityResponseDto;
}