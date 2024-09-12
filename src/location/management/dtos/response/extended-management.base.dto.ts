import { Management } from "./management.base.dto";
import { Expose, Type } from "class-transformer";
import { Area } from "@/location/area/dtos/response/area.base.dto";
import { OmitType } from "@nestjs/mapped-types";


class ExtendedArea extends OmitType(Area, ['management']) { }

export class ExtendedManagement extends Management {
    @Type(() => ExtendedArea)
    @Expose() public readonly areas: ExtendedArea[];
}