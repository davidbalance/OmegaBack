import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Type, Expose } from "class-transformer";
import { ExtendedCompany } from "./extended-company.base.dto";

export class GetExtendedCompanyArrayResponseDto implements ObjectArrayResponse<ExtendedCompany> {
    @Type(() => ExtendedCompany)
    @Expose() public readonly data: ExtendedCompany[];
}