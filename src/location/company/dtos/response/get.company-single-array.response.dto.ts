import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Type, Expose } from "class-transformer";
import { CompanySingleResponseDto } from "./base.company-single.response.dto";

export class GetCompanySingleArrayResponseDto implements ObjectArrayResponse<CompanySingleResponseDto> {
    @Type(() => CompanySingleResponseDto)
    @Expose()
    public readonly data: CompanySingleResponseDto[];
}