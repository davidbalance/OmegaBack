import { Expose, Type } from "class-transformer";

export class GETCityResponseDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
}

export class GETCityArrayResponseDto {
    @Type(() => GETCityResponseDto)
    @Expose()
    public readonly cities: GETCityResponseDto[];
}