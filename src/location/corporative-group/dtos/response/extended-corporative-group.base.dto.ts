import { Expose, Type } from "class-transformer";
import { CorporativeGroup } from "./corporative-group.base.dto";
import { ExtendedCompany } from "@/location/company/dtos/response/extended-company.base.dto";

export class ExtendedCorporativeGroup extends CorporativeGroup {
    @Type(() => ExtendedCompany)
    @Expose() public readonly companies: ExtendedCompany[]
}