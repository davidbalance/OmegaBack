import { Expose, Type } from "class-transformer";
import { Company } from "./company.base.dto";
import { ExtendedBranch } from "@/location/branch/dtos/response/extended-branch.base.dto";

export class ExtendedCompany extends Company {

    @Type(() => ExtendedBranch)
    @Expose() public readonly branches: ExtendedBranch[];
}