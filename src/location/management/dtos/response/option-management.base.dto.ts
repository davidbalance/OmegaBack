import { Expose } from "class-transformer";
import { Management } from "./management.base.dto";
import { Area } from "@/location/area/dtos/response/area.base.dto";

export class OptionManagement extends Management {
    @Expose() public readonly areas: Area;
}