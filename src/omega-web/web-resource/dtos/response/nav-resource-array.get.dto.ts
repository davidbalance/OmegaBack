import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Type, Expose } from "class-transformer";
import { NavResource } from "./nav-resource.base.dto";

export class GetNavResourceArrayResponseDto implements ObjectArrayResponse<NavResource> {
    @Type(() => NavResource)
    @Expose() public readonly data: NavResource[];
}