import { GETBranchResponseDto } from "@/location/branch/dtos/get.branch.dto";
import { Expose, Type } from "class-transformer";

export class GETCompanyResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly ruc: string;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly address: string;

    @Expose()
    public readonly phone: string;

    @Type(() => GETBranchResponseDto)
    @Expose()
    public readonly branches: GETBranchResponseDto[];
}

export class GETCompanyArrayResponseDto {
    @Type(() => GETCompanyResponseDto)
    @Expose()
    public readonly companies: GETCompanyResponseDto[];
}

export class POSTCompanyResponseDto extends GETCompanyResponseDto { }

export class PATCHCompanyResponseDto extends GETCompanyResponseDto { }