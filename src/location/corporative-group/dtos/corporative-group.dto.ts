import { GETCompanyResponseDto } from "@/location/company/dtos/company.response.dto";
import { Expose, Type } from "class-transformer";

export class CorporativeGroupResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => GETCompanyResponseDto)
    @Expose()
    public readonly companies: GETCompanyResponseDto[]
}