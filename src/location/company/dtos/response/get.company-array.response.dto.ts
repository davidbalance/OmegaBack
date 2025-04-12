import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Type, Expose } from "class-transformer";
import { CompanyResponseDto } from "./base.company.response.dto";

export class GETCompanyArrayResponseDto implements ObjectArrayResponse<CompanyResponseDto> {
    @Type(() => CompanyResponseDto)
    @Expose()
    public readonly data: CompanyResponseDto[];
}