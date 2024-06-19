import { GETCityResponseDto } from "@/location/city/dto/city.response.dto";
import { Expose, Type } from "class-transformer";

export class GETBranchResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => GETCityResponseDto)
    @Expose()
    public readonly city: GETCityResponseDto;
}

export class GETBranchArrayResponseDto {
    @Type(() => GETBranchResponseDto)
    @Expose()
    public readonly branches: GETBranchResponseDto[];
}

export class POSTBranchResponseDto extends GETBranchResponseDto { }

export class PATCHBranchResponseDto extends GETBranchResponseDto { }