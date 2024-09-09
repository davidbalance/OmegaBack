import { Expose, Type } from "class-transformer";
import { OptionManagement } from "./option-management.base.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetOptionManagementResponseDto implements ObjectArrayResponse<OptionManagement> {
    @Type(() => OptionManagement)
    @Expose() public readonly data: OptionManagement[];
}