import { Expose, Type } from "class-transformer";

class AreaResponseDto {
    @Expose()
    private readonly id: number;

    @Expose()
    private readonly name: string;
}

export class GETManagementResponseDto {
    @Expose()
    private readonly id: number;

    @Expose()
    private readonly name: string;

    @Type(() => AreaResponseDto)
    @Expose()
    private readonly area: AreaResponseDto[];
}

export class GETManagementArrayResponseDto {
    @Type(() => GETManagementResponseDto)
    @Expose()
    private readonly managements: GETManagementResponseDto[];
}

export class POSTManagementResponseDto extends GETManagementResponseDto { }

export class PATCHManagementResponseDto extends GETManagementResponseDto { }

export class DELETEManagementResponseDto { }