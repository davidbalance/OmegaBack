import { Expose, Type } from "class-transformer";

class AreaResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;
}

export class GETManagementResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => AreaResponseDto)
    @Expose()
    public readonly areas: AreaResponseDto[];
}

export class GETManagementArrayResponseDto {
    @Type(() => GETManagementResponseDto)
    @Expose()
    public readonly managements: GETManagementResponseDto[];
}

export class POSTManagementResponseDto extends GETManagementResponseDto { }

export class PATCHManagementResponseDto extends GETManagementResponseDto { }

export class DELETEManagementResponseDto { }