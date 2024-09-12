import { City } from "@/location/city/dtos/response/city.base.dto";
import { OmitType } from "@nestjs/mapped-types";
import { Expose, Type } from "class-transformer";
import { Branch } from "./branch.base.dto";

export class ExtendedBranch extends OmitType(Branch, ['city']) {
    @Type(() => City)
    @Expose() public readonly city: City;
}