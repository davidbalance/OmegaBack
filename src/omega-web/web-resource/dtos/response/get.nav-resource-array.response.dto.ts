import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Type, Expose } from "class-transformer";
import { NavResourceResponseDto } from "./base.nav-resource.response.dto";

export class GetNavResourceArrayResponseDto implements ObjectArrayResponse<NavResourceResponseDto> {
    @Type(() => NavResourceResponseDto)
    @Expose() public readonly data: NavResourceResponseDto[];
}