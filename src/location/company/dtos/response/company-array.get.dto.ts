import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Type, Expose } from "class-transformer";
import { Company } from "./company.base.dto";

export class GetCompanyArrayResponseDto implements ObjectArrayResponse<Company> {
    @Type(() => Company)
    @Expose() public readonly data: Company[];
}