import { Expose, Type } from "class-transformer";

export class AreaResponseDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
}


export class GETAreaResponseDto {
    @Expose()
    private readonly id: number;
    @Expose()
    private readonly name: string;
}

export class GETAreaArrayResponseDto {
    @Type(() => GETAreaResponseDto)
    @Expose()
    private readonly areas: GETAreaResponseDto[];
}

export class POSTAreaResponseDto extends GETAreaResponseDto { }

export class PATCHAreaResponseDto extends GETAreaResponseDto { }

export class DELETEAreaResponseDto { }