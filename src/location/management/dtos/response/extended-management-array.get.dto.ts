import { Expose, Type } from "class-transformer";
import { ExtendedManagement } from "./extended-management.base.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetExtendedManagementArrayResponseDto implements ObjectArrayResponse<ExtendedManagement> {
    @Type(() => ExtendedManagement)
    @Expose() public readonly data: ExtendedManagement[];

}