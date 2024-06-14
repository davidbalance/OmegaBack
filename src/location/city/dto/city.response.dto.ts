import { Expose, Type } from "class-transformer";

export class GETCityResponseDTO {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
}

export class GETCityArrayResponseDTO {
    @Type(() => GETCityResponseDTO)
    @Expose()
    public readonly cities: GETCityResponseDTO[];
}