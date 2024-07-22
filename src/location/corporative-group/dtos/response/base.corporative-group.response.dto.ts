import { CompanyResponseDto } from "@/location/company/dtos/response/base.company.response.dto";
import { Expose, Type } from "class-transformer";

export class CorporativeGroupResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    
    @Type(() => CompanyResponseDto)
    @Expose() public readonly companies: CompanyResponseDto[]
}