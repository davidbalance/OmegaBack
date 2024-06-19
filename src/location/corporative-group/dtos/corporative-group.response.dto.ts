import { GETCompanyResponseDto } from "@/location/company/dtos/company.response.dto";
import { Expose, Type } from "class-transformer";

export class GETCorporativeGroupResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => GETCompanyResponseDto)
    @Expose()
    public readonly companies: GETCompanyResponseDto[]
}

export class GETCorporativeGroupArrayResponseDto {
    @Type(() => GETCorporativeGroupResponseDto)
    @Expose()
    public readonly groups: GETCorporativeGroupResponseDto[];
}

export class POSTCorporativeGroupResponseDto extends GETCorporativeGroupResponseDto { }

export class PATCHCorporativeGroupResponseDto extends GETCorporativeGroupResponseDto { }